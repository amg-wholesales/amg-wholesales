// app/api/franchise-inquiry/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, message, interests } = body;

    // Validate the request
    if (!name || !email || !phone) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Check if at least one interest area is selected
    if (interests && Object.keys(interests).length > 0) {
      const hasInterest = Object.values(interests).some(value => value);
      if (!hasInterest) {
        return new NextResponse('Please select at least one area of interest', { status: 400 });
      }
    }

    // Format selected interests
    let selectedInterests = [];
    if (interests) {
      selectedInterests = Object.entries(interests)
        .filter(([_, selected]) => selected)
        .map(([interest, _]) => {
          // Convert camelCase to readable text
          return interest
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
        });
    }

    // Create a nodemailer transporter using app password and personal email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Email content
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: process.env.FRANCHISE_EMAIL || process.env.EMAIL_USER, // Send to franchise team
    //   subject: `New Franchise Inquiry from ${name}`,
    //   text: `
    //     Franchise Inquiry Details:
        
    //     Name: ${name}
    //     Email: ${email}
    //     Phone: ${phone}
    //     Desired Location: ${location || 'Not specified'}
        
    //     Areas of Interest:
    //     ${selectedInterests.length > 0 ? selectedInterests.join('\n') : 'None specified'}
        
    //     Message:
    //     ${message || 'No additional message provided'}
    //   `,
    //   html: `
    //     <h2>New Franchise Inquiry</h2>
    //     <p><strong>From:</strong> ${name}</p>
    //     <p><strong>Contact:</strong> ${email} | ${phone}</p>
    //     <p><strong>Desired Location:</strong> ${location || 'Not specified'}</p>
        
    //     <p><strong>Areas of Interest:</strong></p>
    //     ${selectedInterests.length > 0 
    //       ? `<ul>${selectedInterests.map(interest => `<li>${interest}</li>`).join('')}</ul>` 
    //       : '<p>None specified</p>'}
        
    //     <p><strong>Message:</strong></p>
    //     <p>${message ? message.replace(/\n/g, '<br>') : 'No additional message provided'}</p>
    //   `,
    // };

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Franchise Inquiry from ${name} - ${location || 'Location TBD'}`,
        text: `
          NEW FRANCHISE INQUIRY
          
          CONTACT INFORMATION:
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          
          BUSINESS DETAILS:
          Desired Location: ${location || 'Not specified'}
          
          AREAS OF INTEREST:
          ${selectedInterests.length > 0 ? selectedInterests.join('\n') : 'None specified'}
          
          MESSAGE:
          ${message || 'No additional message provided'}
          
          ---
          This inquiry was received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.
          To respond, please contact the prospect directly or reply to this email.
          Inquiry ID: ${Date.now()}
        `,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
              .container { padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
              .header { background-color: #f5f5f5; padding: 15px; border-radius: 5px 5px 0 0; border-bottom: 3px solid #0056b3; }
              h2 { color: #0056b3; margin-top: 0; }
              .section { margin: 20px 0; }
              .footer { font-size: 12px; color: #777; margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; }
              .highlight { background-color: #fafafa; padding: 15px; border-left: 4px solid #0056b3; }
              ul { padding-left: 20px; }
              .cta { background-color: #0056b3; color: white; padding: 10px 15px; text-decoration: none; border-radius: 3px; display: inline-block; }
              .cta:hover { background-color: #003d7a; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Franchise Inquiry</h2>
                <p>A new prospect has expressed interest in franchise opportunities</p>
              </div>
              
              <div class="section">
                <h3>Contact Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              </div>
              
              <div class="section">
                <h3>Business Details</h3>
                <p><strong>Desired Location:</strong> ${location || 'Not specified'}</p>
              </div>
              
              <div class="section">
                <h3>Areas of Interest</h3>
                ${selectedInterests.length > 0 
                  ? `<ul>${selectedInterests.map(interest => `<li>${interest}</li>`).join('')}</ul>` 
                  : '<p>None specified</p>'}
              </div>
              
              <div class="section">
                <h3>Message from Prospect</h3>
                <div class="highlight">
                  <p>${message ? message.replace(/\n/g, '<br>') : 'No additional message provided'}</p>
                </div>
              </div>
              
             
              <div class="footer">
                <p>This inquiry was received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.</p>
               
               </div>
            </div>
          </body>
          </html>
        `,
      };
    // Send an acknowledgment email to the inquirer
    const acknowledgeOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Your Franchise Inquiry - AMG Wholesale',
      text: `
        Dear ${name},
        
        Thank you for your interest in franchising with AMG Wholesale!
        
        We have received your inquiry and a member of our franchise development team will contact you within 24-48 hours to discuss your interest and provide more detailed information.
        
        In the meantime, if you have any urgent questions, please feel free to reach out to us directly at:
        
        Phone: (+1) 516 882 2888
        Email: amgwholesales01@gmail.com
        
        We look forward to exploring this opportunity with you.
        
        Best regards,
        The AMG Wholesale Franchise Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000;">Thank You for Your Franchise Inquiry</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for your interest in franchising with <strong>AMG Wholesale</strong>!</p>
          
          <p>We have received your inquiry and a member of our franchise development team will contact you within 24-48 hours to discuss your interest and provide more detailed information.</p>
          
          <p>In the meantime, if you have any urgent questions, please feel free to reach out to us directly at:</p>
          
          <ul>
            <li>Phone: <a href="tel:+15168822888">(+1) 516 882 2888</a></li>
            <li>Email: <a href="mailto:amgwholesales01@gmail.com">amgwholesales01@gmail.com</a></li>
          </ul>
          
          <p>We look forward to exploring this opportunity with you.</p>
          
          <p>Best regards,<br>
          The AMG Wholesale Franchise Team</p>
          
          <hr style="border: 1px solid #eee; margin-top: 30px;">
          <p style="font-size: 12px; color: #666;">This is an automated response. Please do not reply to this email.</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(acknowledgeOptions);

    return NextResponse.json(
      { message: 'Your franchise inquiry has been submitted successfully! We will contact you within 24-48 hours.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Franchise inquiry error:', error);
    return new NextResponse('Error sending inquiry. Please try again later.', {
      status: 500,
    });
  }
}