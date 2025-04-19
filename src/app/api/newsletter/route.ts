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
    const adminNotification = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Send to admin email or fallback to sender
      subject: 'New Newsletter Subscription',
      text: `New subscriber: ${email}`,
      html: `<p>You have a new newsletter subscriber: <strong>${email}</strong></p>`,
    };

    // Email content for subscriber confirmation
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
        <h2>Thank You for Subscribing!</h2>
        <p>You'll now receive updates on new arrivals, special offers, and discount information.</p>
        <p>If you didn't subscribe to our newsletter, please ignore this email.</p>
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