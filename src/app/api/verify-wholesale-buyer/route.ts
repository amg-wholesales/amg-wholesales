// // api/admin/verify-wholesale-buyer.js
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const { userId, verified } = await request.json();
    
//     // Update the wholesale buyer's verification status
//     const updatedBuyer = await prisma.wholesaleBuyer.update({
//       where: { userId },
//       data: { verified }
//     });
    
//     return NextResponse.json({
//       success: true,
//       message: `Wholesale buyer ${verified ? 'approved' : 'rejected'}`,
//       buyer: updatedBuyer
//     });
//   } catch (error) {
//     console.error('Error verifying wholesale buyer:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to update verification status' },
//       { status: 500 }
//     );
//   }
// }
// api/admin/verify-wholesale-buyer.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { userId, verified } = await request.json();
    
    // Update the wholesale buyer's verification status
    const updatedBuyer = await prisma.wholesaleBuyer.update({
      where: { userId },
      data: { verified },
      include: {
        user: true, // Include user data to get email
      }
    });
    
    // Get user email and name for the notification
    const userEmail = updatedBuyer.user.email;
    const userName = updatedBuyer.user.name;
    const businessName = updatedBuyer.companyName || updatedBuyer.storeName || 'your business';
    
    // Send email notification to the wholesale buyer
    try {
      // Create a nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      
      // Email content based on verification status
      const subject = verified === true 
        ? 'Congratulations! Your Wholesale Account Has Been Approved' 
        : 'Update on Your Wholesale Account Application';
      
      const textContent = verified === true
        ? `
          Dear ${userName},
          
          Great news! Your wholesale account for ${businessName} has been approved.
          
          You can now log in to access wholesale pricing and place orders.
          
          If you have any questions about your account or need assistance with placing orders, please don't hesitate to contact our wholesale support team.
          
          Thank you for choosing to partner with us!
          
          Regards,
          Your Company Team
        `
        : `
          Dear ${userName},
          
          We have reviewed your wholesale account application for ${businessName}.
          
          Unfortunately, we are unable to approve your application at this time.
          
          If you have questions about this decision or would like to provide additional information, please contact our wholesale support team.
          
          Thank you for your interest in our wholesale program.
          
          Regards,
          Your Company Team
        `;
      
      const htmlContent = verified === true
        ? `
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
              
              body { 
                font-family: 'Inter', Arial, sans-serif; 
                line-height: 1.6; 
                color: #374151; 
                background-color: #f9fafb; 
                margin: 0; 
                padding: 0; 
              }
              
              .wrapper {
                max-width: 600px;
                margin: 0 auto;
                padding: 40px 20px;
              }
              
              .container { 
                background-color: #ffffff; 
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                overflow: hidden;
              }
              
              .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 30px;
                text-align: center;
              }
              
              .content {
                padding: 30px;
              }
              
              h1 {
                margin: 0;
                font-weight: 600;
                font-size: 24px;
                letter-spacing: -0.025em;
              }
              
              h2 {
                font-weight: 500;
                font-size: 18px;
                color: #10b981;
                margin: 25px 0 15px;
                padding-bottom: 8px;
                border-bottom: 1px solid #e5e7eb;
              }
              
              .info-box {
                background-color: #f9fafb;
                border-radius: 6px;
                padding: 20px;
                margin-bottom: 25px;
              }
              
              .message-box {
                background-color: #ecfdf5;
                border-left: 4px solid #10b981;
                padding: 20px;
                border-radius: 0 6px 6px 0;
                margin-top: 15px;
              }
              
              .footer {
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                padding: 20px 30px;
                background-color: #f9fafb;
                border-top: 1px solid #e5e7eb;
              }
              
              p {
                margin: 0 0 15px 0;
              }
              
              .status-badge {
                display: inline-block;
                font-size: 12px;
                font-weight: 500;
                color: #ffffff;
                background-color: #10b981;
                border-radius: 9999px;
                padding: 4px 12px;
                margin-top: 10px;
              }
              
              .next-steps {
                margin-top: 25px;
                padding: 15px;
                background-color: #f9fafb;
                border-radius: 6px;
                border-left: 4px solid #10b981;
              }
              
              .button {
                display: inline-block;
                background-color: #10b981;
                color: white;
                text-decoration: none;
                padding: 12px 20px;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  <h1>Wholesale Account Approved!</h1>
                </div>
                
                <div class="content">
                  <h2>Hello ${userName}</h2>
                  <div class="info-box">
                    <p>Great news! Your wholesale account for <strong>${businessName}</strong> has been approved.</p>
                    <span class="status-badge">Account Approved</span>
                  </div>
                  
                  <div class="message-box">
                    <p>You can now log in to access wholesale pricing and place orders.</p>
                    <p>Your account has been fully activated with all wholesale privileges.</p>
                  </div>
                  
                  <div class="next-steps">
                    <h2 style="margin-top: 0;">What's Next?</h2>
                    <p>Now that your account is approved, you can:</p>
                    <ul>
                      <li>Log in to your account</li>
                      <li>Browse products with wholesale pricing</li>
                      <li>Place bulk orders</li>
                      <li>Manage your wholesale account settings</li>
                    </ul>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="/login" class="button">Log In Now</a>
                  </div>
                </div>
                
                <div class="footer">
                  <p>If you have any questions, please contact our wholesale support team.</p>
                  <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
        : `
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
              
              body { 
                font-family: 'Inter', Arial, sans-serif; 
                line-height: 1.6; 
                color: #374151; 
                background-color: #f9fafb; 
                margin: 0; 
                padding: 0; 
              }
              
              .wrapper {
                max-width: 600px;
                margin: 0 auto;
                padding: 40px 20px;
              }
              
              .container { 
                background-color: #ffffff; 
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                overflow: hidden;
              }
              
              .header {
                background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
                color: white;
                padding: 30px;
                text-align: center;
              }
              
              .content {
                padding: 30px;
              }
              
              h1 {
                margin: 0;
                font-weight: 600;
                font-size: 24px;
                letter-spacing: -0.025em;
              }
              
              h2 {
                font-weight: 500;
                font-size: 18px;
                color: #4b5563;
                margin: 25px 0 15px;
                padding-bottom: 8px;
                border-bottom: 1px solid #e5e7eb;
              }
              
              .info-box {
                background-color: #f9fafb;
                border-radius: 6px;
                padding: 20px;
                margin-bottom: 25px;
              }
              
              .message-box {
                background-color: #f9fafb;
                border-left: 4px solid #6b7280;
                padding: 20px;
                border-radius: 0 6px 6px 0;
                margin-top: 15px;
              }
              
              .footer {
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                padding: 20px 30px;
                background-color: #f9fafb;
                border-top: 1px solid #e5e7eb;
              }
              
              p {
                margin: 0 0 15px 0;
              }
              
              .status-badge {
                display: inline-block;
                font-size: 12px;
                font-weight: 500;
                color: #ffffff;
                background-color: #6b7280;
                border-radius: 9999px;
                padding: 4px 12px;
                margin-top: 10px;
              }
              
              .contact-us {
                margin-top: 25px;
                padding: 15px;
                background-color: #f9fafb;
                border-radius: 6px;
                border-left: 4px solid #6b7280;
              }
              
              .button {
                display: inline-block;
                background-color: #6b7280;
                color: white;
                text-decoration: none;
                padding: 12px 20px;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  <h1>Wholesale Account Update</h1>
                </div>
                
                <div class="content">
                  <h2>Hello ${userName}</h2>
                  <div class="info-box">
                    <p>We have reviewed your wholesale account application for <strong>${businessName}</strong>.</p>
                    <p>Unfortunately, we are unable to approve your application at this time.</p>
                    <span class="status-badge">Application Not Approved</span>
                  </div>
                  
                  <div class="message-box">
                    <p>If you believe there has been an error or would like to provide additional information to support your application, please contact our wholesale support team.</p>
                  </div>
                  
                  <div class="contact-us">
                    <h2 style="margin-top: 0;">Contact Us</h2>
                    <p>For any questions about this decision or to discuss your application further:</p>
                    <ul>
                      <li>Email our wholesale team</li>
                      <li>Call our wholesale support line</li>
                      <li>Submit additional documentation</li>
                    </ul>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="/contact" class="button">Contact Support</a>
                  </div>
                </div>
                
                <div class="footer">
                  <p>Thank you for your interest in our wholesale program.</p>
                  <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;
      
      // Configure email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: subject,
        text: textContent,
        html: htmlContent,
      };
      
      // Send the email
      await transporter.sendMail(mailOptions);
      
    } catch (emailError) {
      console.error('Error sending wholesale verification email:', emailError);
      // Continue with the response even if email fails
    }
    
    return NextResponse.json({
      success: true,
      message: `Wholesale buyer ${verified ? 'approved' : 'rejected'} and notification sent`,
      buyer: updatedBuyer
    });
  } catch (error) {
    console.error('Error verifying wholesale buyer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update verification status' },
      { status: 500 }
    );
  }
}