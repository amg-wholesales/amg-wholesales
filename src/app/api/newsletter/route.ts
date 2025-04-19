// app/api/newsletter/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate the request
    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    // Validate email format with a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new NextResponse('Invalid email format', { status: 400 });
    }

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Email content for admin notification
    // const adminNotification = {
    //   from: process.env.EMAIL_USER,
    //   to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Send to admin email or fallback to sender
    //   subject: 'New Newsletter Subscription',
    //   text: `New subscriber: ${email}`,
    //   html: `<p>You have a new newsletter subscriber: <strong>${email}</strong></p>`,
    // };

    // // Email content for subscriber confirmation
    // const subscriberConfirmation = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: 'Thank You for Subscribing to Our Newsletter',
    //   text: `
    //     Thank you for subscribing to our newsletter!
        
    //     You'll now receive updates on new arrivals, special offers, and discount information.
        
    //     If you didn't subscribe to our newsletter, please ignore this email.
    //   `,
    //   html: `
    //     <h2>Thank You for Subscribing!</h2>
    //     <p>You'll now receive updates on new arrivals, special offers, and discount information.</p>
    //     <p>If you didn't subscribe to our newsletter, please ignore this email.</p>
    //   `,
    // };
// Admin notification of new subscriber
const adminNotification = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Send to admin email or fallback to sender
    subject: 'New Newsletter Subscription',
    text: `New subscriber: ${email}`,
    html: `
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
            padding: 20px;
          }
          
          .container { 
            background-color: #ffffff; 
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
          
          .header {
            background-color: #10b981;
            color: white;
            padding: 20px;
            text-align: center;
          }
          
          .content {
            padding: 30px;
          }
          
          .subscriber-card {
            background-color: #f0fdf4;
            border: 1px solid #d1fae5;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
            display: flex;
            align-items: center;
          }
          
          .avatar {
            background-color: #10b981;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            margin-right: 15px;
          }
          
          .subscriber-info {
            flex: 1;
          }
          
          h1 {
            margin: 0;
            font-weight: 600;
            font-size: 22px;
            letter-spacing: -0.025em;
          }
          
          .badge {
            display: inline-block;
            background-color: #10b981;
            color: white;
            font-size: 12px;
            font-weight: 500;
            padding: 4px 8px;
            border-radius: 9999px;
            margin-left: 10px;
          }
          
          .email {
            font-size: 18px;
            font-weight: 500;
            color: #111827;
            margin: 0;
            word-break: break-all;
          }
          
          .timestamp {
            font-size: 14px;
            color: #6b7280;
            margin: 5px 0 0 0;
          }
          
          .stats-container {
            display: flex;
            margin: 30px 0 20px;
          }
          
          .stat-box {
            flex: 1;
            background-color: #f9fafb;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
            margin: 0 5px;
          }
          
          .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #10b981;
            margin: 0;
          }
          
          .stat-label {
            font-size: 14px;
            color: #6b7280;
            margin: 5px 0 0 0;
          }
          
          .footer {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            padding: 20px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          
          .button {
            display: inline-block;
            background-color: #10b981;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>New Newsletter Subscriber </h1>
            </div>
            
            <div class="content">
              <p>You have a new subscriber to your newsletter!</p>
              
              <div class="subscriber-card">
               
                <div class="subscriber-info">
                  <p class="email">${email}</p>
                  <p class="timestamp">Subscribed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                </div>
              </div>
              
             
              
              
            </div>
            
            <div class="footer">
              <p>This is an automated notification from your newsletter system.</p>
              <p>&copy; ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'AMG WHOLESALE'}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
  
  // Subscriber confirmation email
  const subscriberConfirmation = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank You for Subscribing to Our Newsletter',
    text: `
      Thank you for subscribing to our newsletter!
      
      You'll now receive updates on new arrivals, special offers, and discount information.
      
      If you didn't subscribe to our newsletter, please ignore this email.
    `,
    html: `
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
            padding: 20px;
          }
          
          .container { 
            background-color: #ffffff; 
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
          
          .header {
            position: relative;
            height: 160px;
            overflow: hidden;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          }
          
          .header-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
            background-image: radial-gradient(circle at 20px 20px, white 2px, transparent 0);
            background-size: 40px 40px;
          }
          
          .header-content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 20px;
          }
          
          .logo {
            margin-bottom: 15px;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.025em;
          }
          
          .content {
            padding: 30px;
          }
          
          h1 {
            margin: 0 0 20px 0;
            font-weight: 600;
            font-size: 24px;
            letter-spacing: -0.025em;
            color: #111827;
            text-align: center;
          }
          
          .benefits {
            margin: 30px 0;
          }
          
          .benefit {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
          }
          
          .benefit-icon {
            background-color: #f3f4f6;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
          }
          
          .benefit-icon span {
            color: #4f46e5;
            font-weight: bold;
          }
          
          .benefit-text {
            flex: 1;
            margin: 0;
          }
          
          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 30px 0;
          }
          
          .contact-section {
            background-color: #f9fafb;
            border-radius: 6px;
            padding: 20px;
            margin-top: 30px;
          }
          
          .social-links {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
          
          .social-link {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 5px;
            color: #4f46e5;
            text-decoration: none;
            font-weight: bold;
          }
          
          .footer {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            padding: 20px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          
          .footer p {
            margin: 5px 0;
          }
          
          .unsubscribe {
            color: #6b7280;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <div class="header-pattern"></div>
              <div class="header-content">
                
                <h2>Thank You for Subscribing!</h2>
              </div>
            </div>
            
            <div class="content">
              <h1>Welcome to Our Newsletter</h1>
              <p>Thanks for subscribing to our newsletter! We're excited to have you join our community. You'll now receive updates on:</p>
              
              
              
              <div class="divider"></div>
              
              <p>We promise not to spam your inbox and you can unsubscribe at any time.</p>
              
              <div class="contact-section">
                <p style="text-align: center; margin-top: 0;"><strong>Have questions or need assistance?</strong></p>
                <p style="text-align: center; margin-bottom: 0;">Contact us at <a href="mailto:${process.env.CONTACT_EMAIL || process.env.EMAIL_USER}" style="color: #4f46e5; text-decoration: none;">${process.env.CONTACT_EMAIL || process.env.EMAIL_USER}</a></p>
              </div>
              
              
            </div>
            
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Your Company'}. All rights reserved.</p>
            
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
    // Send the emails
    await transporter.sendMail(adminNotification);
    await transporter.sendMail(subscriberConfirmation);

    return NextResponse.json(
      { message: 'Subscription successful!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new NextResponse('Error processing subscription. Please try again later.', {
      status: 500,
    });
  }
}