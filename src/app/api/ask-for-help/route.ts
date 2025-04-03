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
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // The recipient email
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
        <h2>New Support Request</h2>
        <p><strong>From:</strong> ${email}</p>
        
        <p><strong>Issues:</strong></p>
        <ul>
          ${selectedIssues.map(issue => `<li>${issue}</li>`).join('')}
        </ul>
        
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
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