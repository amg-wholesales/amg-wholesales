// // app/api/contact/route.js
// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { firstName, lastName, email, message } = body;

//     // Validate the request
//     if (!firstName || !lastName || !email || !message) {
//       return new NextResponse('Missing required fields', { status: 400 });
//     }

//     // Create a nodemailer transporter using app password and personal email
//     // The user will need to replace these with their own credentials
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER, // user needs to set this in .env
//         pass: process.env.EMAIL_APP_PASSWORD, // app password from Google account
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email, // The recipient email
//       subject: `Contact Form: Message from ${firstName} ${lastName}`,
//       text: `
//         Name: ${firstName} ${lastName}
//         Email: ${email}
        
//         Message:
//         ${message}
//       `,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${firstName} ${lastName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message.replace(/\n/g, '<br>')}</p>
//       `,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: 'Message sent successfully!' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Contact form error:', error);
//     return new NextResponse('Error sending message. Please try again later.', {
//       status: 500,
//     });
//   }
// }
// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // Validate the request
    if (!firstName || !lastName || !email || !message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Create a nodemailer transporter using app password and personal email
    // The user will need to replace these with their own credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // user needs to set this in .env
        pass: process.env.EMAIL_APP_PASSWORD, // app password from Google account
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to site owner instead of submitter
      subject: `Contact Form: Message from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        
        Message:
        ${message}
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
              padding: 40px 20px;
            }
            
            .container { 
              background-color: #ffffff; 
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
              overflow: hidden;
            }
            
            .header {
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
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
              color: #4f46e5;
              margin: 25px 0 15px;
              padding-bottom: 8px;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .contact-info {
              background-color: #f9fafb;
              border-radius: 6px;
              padding: 20px;
              margin-bottom: 25px;
            }
            
            .message-box {
              background-color: #f9fafb;
              border-left: 4px solid #4f46e5;
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
            
            .label {
              font-weight: 500;
              color: #6b7280;
              font-size: 14px;
              display: block;
              margin-bottom: 5px;
            }
            
            .value {
              font-weight: 400;
              color: #111827;
            }
            
            .timestamp {
              display: inline-block;
              font-size: 12px;
              color: #6b7280;
              background-color: #e5e7eb;
              border-radius: 9999px;
              padding: 2px 10px;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
              </div>
              
              <div class="content">
                <h2>Contact Information</h2>
                <div class="contact-info">
                  <p>
                    <span class="label">From</span>
                    <span class="value">${firstName} ${lastName}</span>
                  </p>
                  <p>
                    <span class="label">Email</span>
                    <span class="value"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></span>
                  </p>
                  <span class="timestamp">Received ${new Date().toLocaleString()}</span>
                </div>
                
                <h2>Message</h2>
                <div class="message-box">
                  ${message.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                </div>
              </div>
              
              <div class="footer">
                <p>This message was sent through your website contact form.</p>
                <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new NextResponse('Error sending message. Please try again later.', {
      status: 500,
    });
  }
}