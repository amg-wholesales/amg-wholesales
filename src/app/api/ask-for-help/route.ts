// app/api/ask-for-help/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { issues, message, email } = body;

    // Validate the request
    if (!issues || !message || !email) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Check if at least one issue is selected
    const hasIssue = Object.values(issues).some(value => value);
    if (!hasIssue) {
      return new NextResponse('Please select at least one issue', { status: 400 });
    }

    // Format selected issues
    const selectedIssues = Object.entries(issues)
      .filter(([_, selected]) => selected)
      .map(([issue, _]) => {
        // Convert camelCase to readable text
        return issue
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
      });

    // Create a nodemailer transporter using app password and personal email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // user needs to set this in .env
        pass: process.env.EMAIL_APP_PASSWORD, // app password from Google account
      },
    });

    // Email content
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email, // The recipient email
    //   subject: `Support Request: Help Needed from ${email}`,
    //   text: `
    //     Support Request Details:
        
    //     From: ${email}
        
    //     Issues:
    //     ${selectedIssues.join('\n')}
        
    //     Message:
    //     ${message}
    //   `,
    //   html: `
    //     <h2>New Support Request</h2>
    //     <p><strong>From:</strong> ${email}</p>
        
    //     <p><strong>Issues:</strong></p>
    //     <ul>
    //       ${selectedIssues.map(issue => `<li>${issue}</li>`).join('')}
    //     </ul>
        
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    // };
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // The recipient email
      subject: `Support Request: Help Needed from ${email}`,
      text: `
        Support Request Details:
        
        From: ${email}
        
        Issues:
        ${selectedIssues.join('\n')}
        
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
              background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            
            .priority-badge {
              display: inline-block;
              background-color: #ef4444;
              color: white;
              padding: 4px 12px;
              border-radius: 9999px;
              font-size: 14px;
              font-weight: 500;
              margin-top: 10px;
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
              color: #0284c7;
              margin: 25px 0 15px;
              padding-bottom: 8px;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .contact-info {
              background-color: #f0f9ff;
              border-radius: 6px;
              padding: 20px;
              margin-bottom: 25px;
            }
            
            .issues-list {
              background-color: #f0f9ff;
              border-radius: 6px;
              padding: 15px 15px 15px 35px;
              margin: 15px 0 25px 0;
            }
            
            .issues-list li {
              padding: 5px 0;
            }
            
            .message-box {
              background-color: #f0f9ff;
              border-left: 4px solid #0ea5e9;
              padding: 20px;
              border-radius: 0 6px 6px 0;
              margin-top: 15px;
            }
            
            .footer {
              text-align: center;
              font-size: 12px;
              color: #6b7280;
              padding: 20px 30px;
              background-color: #f0f9ff;
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
            
            .buttons {
              margin-top: 25px;
              text-align: center;
            }
            
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #0ea5e9;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
              margin: 0 5px;
            }
            
            .button.secondary {
              background-color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <h1>New Support Request</h1>
                <div class="priority-badge">Needs Attention</div>
              </div>
              
              <div class="content">
                <h2>Customer Information</h2>
                <div class="contact-info">
                  <p>
                    <span class="label">Email Address</span>
                    <span class="value"><a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></span>
                  </p>
                  <span class="timestamp">Received ${new Date().toLocaleString()}</span>
                </div>
                
                <h2>Support Issues</h2>
                <ul class="issues-list">
                  ${selectedIssues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
                
                <h2>Customer Message</h2>
                <div class="message-box">
                  ${message.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                </div>
                
                
              </div>
              
              <div class="footer">
                <p>This support request was received through your website.</p>
               
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
      { message: 'Your support request has been submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Support request error:', error);
    return new NextResponse('Error sending request. Please try again later.', {
      status: 500,
    });
  }
}