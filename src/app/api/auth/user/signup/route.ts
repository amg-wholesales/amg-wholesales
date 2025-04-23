
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { 
//       name, 
//       email, 
//       password,
//       buyerType, // New field to determine wholesale or retail
//       // Common buyer fields
//       contactPerson,
//       cellPhone,
//       addressLine1,
//       city,
//       state,
//       zipCode,
//       notes,
//       // Wholesale-specific fields
//       taxId,
//       taxIdFile,
//       storeName,
//       companyName,
//       officePhone,
//     } = body;
    
//     // Validate required inputs
//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Name, email, and password are required' },
//         { status: 400 }
//       );
//     }
    
//     // Validate buyer type
//     if (!buyerType || (buyerType !== 'WHOLESALE_BUYER' && buyerType !== 'RETAIL_BUYER')) {
//       return NextResponse.json(
//         { success: false, error: 'Valid buyer type is required' },
//         { status: 400 }
//       );
//     }

//     // Wholesale buyer validation
//     if (buyerType === 'WHOLESALE_BUYER' && !companyName && !storeName) {
//       return NextResponse.json(
//         { success: false, error: 'Either Company Name or Store Name is required for wholesale buyers' },
//         { status: 400 }
//       );
//     }
    
//     // Normalize email
//     const normalizedEmail = email.toLowerCase().trim();
    
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email: normalizedEmail }
//     });
    
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, error: 'Email already registered' },
//         { status: 409 }
//       );
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Create user and buyer profile in a transaction based on buyer type
//     const result = await prisma.$transaction(async (prisma) => {
//       // Create user
//       const user = await prisma.user.create({
//         data: {
//           name,
//           email: normalizedEmail,
//           password: hashedPassword,
//           userType: buyerType
//         }
//       });
      
//       // Create appropriate buyer profile based on type
//       if (buyerType === 'WHOLESALE_BUYER') {
//         // Create wholesale buyer profile
//         const buyer = await prisma.wholesaleBuyer.create({
//           data: {
//             userId: user.id,
//             taxId,
//             taxIdFile,
//             storeName,
//             companyName,
//             contactPerson,
//             officePhone,
//             cellPhone,
//             addressLine1,
//             city,
//             state,
//             zipCode,
//             notes
//           }
//         });
//         return { user, buyer };
//       } else {
//         // Create retail buyer profile
//         const buyer = await prisma.retailBuyer.create({
//           data: {
//             userId: user.id,
//             contactPerson,
//             cellPhone,
//             addressLine1,
//             city,
//             state,
//             zipCode,
//             notes
//           }
//         });
//         return { user, buyer };
//       }
//     });
    
//     // Set authentication cookie
//     const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
//     const cookieStore = await cookies(); // Updated to use await
    
//     cookieStore.set('auth', JSON.stringify({
//       id: result.user.id,
//       email: result.user.email,
//       type: buyerType,
//       exp: expirationTime
//     }), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 30 * 24 * 60 * 60,
//       path: '/'
//     });
    
//     // Return success response without password
//     return NextResponse.json({
//       success: true,
//       user: {
//         id: result.user.id,
//         name: result.user.name,
//         email: result.user.email,
//         userType: buyerType
//       },
//       buyer: {
//         userId: result.buyer.userId,
//         // Include appropriate fields based on buyer type
//         ...(buyerType === 'WHOLESALE_BUYER' ? {
//           companyName: result.buyer.companyName,
//           storeName: result.buyer.storeName
//         } : {})
//       }
//     });
    
//   } catch (error) {
//     console.error('User signup error:', error);
//     return NextResponse.json(
//       { success: false, error: 'An unexpected error occurred', details: error.message },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { 
//       name, 
//       email, 
//       password,
//       buyerType,
//       // Common buyer fields
//       contactPerson,
//       cellPhone,
//       addressLine1,
//       city,
//       state,
//       zipCode,
//       notes,
//       // Wholesale-specific fields
//       taxId,
//       taxIdFile,
//       storeName,
//       companyName,
//       officePhone,
//     } = body;
    
//     // Validate required inputs
//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Name, email, and password are required' },
//         { status: 400 }
//       );
//     }
    
//     // Validate buyer type
//     if (!buyerType || (buyerType !== 'WHOLESALE_BUYER' && buyerType !== 'RETAIL_BUYER')) {
//       return NextResponse.json(
//         { success: false, error: 'Valid buyer type is required' },
//         { status: 400 }
//       );
//     }

//     // Wholesale buyer validation
//     if (buyerType === 'WHOLESALE_BUYER' && !companyName && !storeName) {
//       return NextResponse.json(
//         { success: false, error: 'Either Company Name or Store Name is required for wholesale buyers' },
//         { status: 400 }
//       );
//     }
    
//     // Normalize email
//     const normalizedEmail = email.toLowerCase().trim();
    
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email: normalizedEmail }
//     });
    
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, error: 'Email already registered' },
//         { status: 409 }
//       );
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Create user and buyer profile in a transaction based on buyer type
//     const result = await prisma.$transaction(async (prisma) => {
//       // Create user
//       const user = await prisma.user.create({
//         data: {
//           name,
//           email: normalizedEmail,
//           password: hashedPassword,
//           userType: buyerType
//         }
//       });
      
//       // Create appropriate buyer profile based on type
//       if (buyerType === 'WHOLESALE_BUYER') {
//         // Create wholesale buyer profile (verified = false by default)
//         const buyer = await prisma.wholesaleBuyer.create({
//           data: {
//             userId: user.id,
//             taxId,
//             taxIdFile,
//             storeName,
//             companyName,
//             contactPerson,
//             officePhone,
//             cellPhone,
//             addressLine1,
//             city,
//             state,
//             zipCode,
//             notes,
//             verified: false
//           }
//         });
//         return { user, buyer };
//       } else {
//         // Create retail buyer profile
//         const buyer = await prisma.retailBuyer.create({
//           data: {
//             userId: user.id,
//             contactPerson,
//             cellPhone,
//             addressLine1,
//             city,
//             state,
//             zipCode,
//             notes
//           }
//         });
//         return { user, buyer };
//       }
//     });
    
//     // For retail buyers, set authentication cookie
//     // For wholesale buyers, don't set cookie since they need verification
//     if (buyerType === 'RETAIL_BUYER') {
//       const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
//       const cookieStore = await cookies();
      
//       cookieStore.set('auth', JSON.stringify({
//         id: result.user.id,
//         email: result.user.email,
//         type: buyerType,
//         exp: expirationTime
//       }), {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         maxAge: 30 * 24 * 60 * 60,
//         path: '/'
//       });
//     }
    
//     // Return success response with appropriate message
//     if (buyerType === 'WHOLESALE_BUYER') {
//       return NextResponse.json({
//         success: true,
//         requiresVerification: true,
//         message: 'Your wholesale account has been created and is pending admin approval. You will be notified once your account is verified.',
//         user: {
//           id: result.user.id,
//           name: result.user.name,
//           email: result.user.email,
//           userType: buyerType
//         }
//       });
//     } else {
//       return NextResponse.json({
//         success: true,
//         user: {
//           id: result.user.id,
//           name: result.user.name,
//           email: result.user.email,
//           userType: buyerType
//         }
//       });
//     }
    
//   } catch (error) {
//     console.error('User signup error:', error);
//     return NextResponse.json(
//       { success: false, error: 'An unexpected error occurred', details: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer'; // Add nodemailer import

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { 
      name, 
      email, 
      password,
      buyerType,
      // Common buyer fields
      contactPerson,
      cellPhone,
      addressLine1,
      city,
      state,
      zipCode,
      notes,
      // Wholesale-specific fields
      taxId,
      taxIdFile,
      storeName,
      companyName,
      officePhone,
    } = body;
    
    // Validate required inputs
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Validate buyer type
    if (!buyerType || (buyerType !== 'WHOLESALE_BUYER' && buyerType !== 'RETAIL_BUYER')) {
      return NextResponse.json(
        { success: false, error: 'Valid buyer type is required' },
        { status: 400 }
      );
    }

    // Wholesale buyer validation
    if (buyerType === 'WHOLESALE_BUYER' && !companyName && !storeName) {
      return NextResponse.json(
        { success: false, error: 'Either Company Name or Store Name is required for wholesale buyers' },
        { status: 400 }
      );
    }
    
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user and buyer profile in a transaction based on buyer type
    const result = await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email: normalizedEmail,
          password: hashedPassword,
          userType: buyerType
        }
      });
      
      // Create appropriate buyer profile based on type
      if (buyerType === 'WHOLESALE_BUYER') {
        // Create wholesale buyer profile (verified = false by default)
        const buyer = await prisma.wholesaleBuyer.create({
          data: {
            userId: user.id,
            taxId,
            taxIdFile,
            storeName,
            companyName,
            contactPerson,
            officePhone,
            cellPhone,
            addressLine1,
            city,
            state,
            zipCode,
            notes,
            verified: false
          }
        });
        return { user, buyer };
      } else {
        // Create retail buyer profile
        const buyer = await prisma.retailBuyer.create({
          data: {
            userId: user.id,
            contactPerson,
            cellPhone,
            addressLine1,
            city,
            state,
            zipCode,
            notes
          }
        });
        return { user, buyer };
      }
    });
    
    // For retail buyers, set authentication cookie
    // For wholesale buyers, don't set cookie since they need verification
    if (buyerType === 'RETAIL_BUYER') {
      const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
      const cookieStore = await cookies();
      
      cookieStore.set('auth', JSON.stringify({
        id: result.user.id,
        email: result.user.email,
        type: buyerType,
        exp: expirationTime
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
    }
    
            // Send email notifications for wholesale buyers
    if (buyerType === 'WHOLESALE_BUYER') {
      try {
        // Create a nodemailer transporter using app password
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
          },
        });
    
        // Email content for wholesale buyer
        const buyerMailOptions = {
          from: process.env.EMAIL_USER,
          to: normalizedEmail, // Send to the wholesale buyer
          subject: 'Your Wholesale Account Registration',
          text: `
            Dear ${name},
            
            Thank you for registering for a wholesale account with us. Your application is currently pending administrative approval.
            
            We will notify you once your account has been verified. This process typically takes 1-2 business days.
            
            If you have any questions, please contact our support team.
            
            Regards,
            Your Company Team
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
                
                .info-box {
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
                
                .status-badge {
                  display: inline-block;
                  font-size: 12px;
                  font-weight: 500;
                  color: #ffffff;
                  background-color: #f59e0b;
                  border-radius: 9999px;
                  padding: 4px 12px;
                  margin-top: 10px;
                }
                
                .next-steps {
                  margin-top: 25px;
                  padding: 15px;
                  background-color: #ecfdf5;
                  border-radius: 6px;
                  border-left: 4px solid #10b981;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    <h1>Wholesale Account Registration</h1>
                  </div>
                  
                  <div class="content">
                    <h2>Hello ${name}</h2>
                    <div class="info-box">
                      <p>Thank you for registering for a wholesale account with us.</p>
                      <p>Your account has been created and is now <strong>pending administrative approval</strong>.</p>
                      <span class="status-badge">Pending Verification</span>
                    </div>
                    
                    <div class="message-box">
                      <p>We'll review your application promptly. This process typically takes 1-2 business days.</p>
                      <p>Once your account is verified, you'll receive another email confirmation and will be able to log in and access wholesale pricing.</p>
                    </div>
                    
                    <div class="next-steps">
                      <h2 style="margin-top: 0;">What's Next?</h2>
                      <p>While you wait for account verification, you can:</p>
                      <ul>
                        <li>Browse our product catalog</li>
                        <li>Prepare your wholesale shopping list</li>
                        <li>Contact our support team if you have any questions</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="footer">
                    <p>This is an automated message, please do not reply directly to this email.</p>
                    <p>If you need assistance, please contact our support team.</p>
                    <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        };
    
        // Email content for admin notification
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL, // Send to admin email
          subject: `New Wholesale Account Request - ${companyName || storeName}`,
          text: `
            New Wholesale Account Request
            
            A new wholesale buyer has registered and requires verification:
            
            Name: ${name}
            Email: ${normalizedEmail}
            Company: ${companyName || ''}
            Store: ${storeName || ''}
            Tax ID: ${taxId || 'Not provided'}
            
            Contact Information:
            Contact Person: ${contactPerson || name}
            Office Phone: ${officePhone || ''}
            Cell Phone: ${cellPhone || ''}
            
            Address:
            ${addressLine1 || ''}
            ${city || ''}, ${state || ''} ${zipCode || ''}
            
            Notes:
            ${notes || 'No additional notes provided'}
            
            Please log in to the admin dashboard to review and approve this account.
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
                  background: linear-gradient(135deg, #4338ca 0%, #3b82f6 100%);
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
                
                .detail-section {
                  background-color: #f9fafb;
                  border-radius: 6px;
                  padding: 20px;
                  margin-bottom: 25px;
                }
                
                .detail-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 15px;
                }
                
                .detail-item {
                  margin-bottom: 12px;
                }
                
                .action-button {
                  display: inline-block;
                  background-color:rgb(229, 147, 70);
                  color: black;
                  text-decoration: none;
                  padding: 12px 24px;
                  border-radius: 6px;
                  font-weight: 500;
                  margin-top: 20px;
                  text-align: center;
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
                
                .alert-badge {
                  display: inline-block;
                  font-size: 12px;
                  font-weight: 500;
                  color: #ffffff;
                  background-color: #dc2626;
                  border-radius: 9999px;
                  padding: 4px 12px;
                  margin-top: 10px;
                }
                
                .notes-box {
                  background-color: #f9fafb;
                  border-left: 4px solid #4f46e5;
                  padding: 15px;
                  border-radius: 0 6px 6px 0;
                  margin-top: 15px;
                  font-style: italic;
                  color: #4b5563;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    <h1>New Wholesale Account Request</h1>
                  </div>
                  
                  <div class="content">
                    <p>A new wholesale buyer has registered and requires your verification:</p>
                    <span class="alert-badge">Action Required</span>
                    
                    <h2>Business Information</h2>
                    <div class="detail-section">
                      <div class="detail-grid">
                        <div class="detail-item">
                          <span class="label">Business Name</span>
                          <span class="value">${companyName || storeName || 'Not provided'}</span>
                        </div>
                        <div class="detail-item">
                          <span class="label">Tax ID</span>
                          <span class="value">${taxId || 'Not provided'}</span>
                        </div>
                        <div class="detail-item">
                          <span class="label">Tax ID File</span>
                          <span class="value">${taxIdFile ? 'Provided' : 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h2>Contact Information</h2>
                    <div class="detail-section">
                      <div class="detail-grid">
                        <div class="detail-item">
                          <span class="label">Contact Name</span>
                          <span class="value">${contactPerson || name}</span>
                        </div>
                        <div class="detail-item">
                          <span class="label">Email</span>
                          <span class="value"><a href="mailto:${normalizedEmail}" style="color: #4f46e5; text-decoration: none;">${normalizedEmail}</a></span>
                        </div>
                        <div class="detail-item">
                          <span class="label">Office Phone</span>
                          <span class="value">${officePhone || 'Not provided'}</span>
                        </div>
                        <div class="detail-item">
                          <span class="label">Cell Phone</span>
                          <span class="value">${cellPhone || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h2>Address</h2>
                    <div class="detail-section">
                      <p>${addressLine1 || 'No address line provided'}</p>
                      <p>${city || ''} ${state || ''} ${zipCode || ''}</p>
                    </div>
                    
                    ${notes ? `
                    <h2>Additional Notes</h2>
                    <div class="notes-box">
                      ${notes}
                    </div>
                    ` : ''}
                    
                    <p style="margin-top: 25px;">Please review this application and verify the account in the admin dashboard.</p>
                    <a href="/admin/wholesalers-verification" class="action-button">Review in Admin Dashboard</a>
                  </div>
                  
                  <div class="footer">
                    <p>This is an automated message from your website notification system.</p>
                    <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        };
    
        // Send emails (both to buyer and admin)
        await Promise.all([
          transporter.sendMail(buyerMailOptions),
          transporter.sendMail(adminMailOptions)
        ]);
        
      } catch (emailError) {
        console.error('Error sending wholesale buyer notification emails:', emailError);
        // Continue with the response even if email fails
        // You may want to log this or handle it differently
      }
    }
    
    // Return success response with appropriate message
    if (buyerType === 'WHOLESALE_BUYER') {
      return NextResponse.json({
        success: true,
        requiresVerification: true,
        message: 'Your wholesale account has been created and is pending admin approval. You will be notified once your account is verified.',
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          userType: buyerType
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          userType: buyerType
        }
      });
    }
    
  } catch (error) {
    console.error('User signup error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred', details: error.message },
      { status: 500 }
    );
  }
}