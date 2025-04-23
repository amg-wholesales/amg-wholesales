
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function PATCH(request, { params }) {
//   try {
//     const { id } = params;
//     const body = await request.json();
//     const { status, notes } = body;
    
//     // Validate ID
//     if (!id) {
//       return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
//     }
    
//     // Update purchase request
//     const updatedRequest = await prisma.purchaseRequest.update({
//       where: {
//         id: id,
//       },
//       data: {
//         ...(status && { status }),
//         ...(notes !== undefined && { notes }),
//       },
//     });
    
//     return NextResponse.json({ 
//       message: 'Purchase request updated successfully',
//       purchaseRequest: updatedRequest
//     });
//   } catch (error) {
//     console.error('Error updating purchase request:', error);
//     return NextResponse.json({ error: 'Failed to update purchase request', details: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, notes } = body;
    
    // Validate ID
    if (!id) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }
    
    // Update purchase request and include relations for email notification
    const updatedRequest = await prisma.purchaseRequest.update({
      where: {
        id: id,
      },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
      include: {
        user: {
          include: {
            wholesaleBuyer: true,
            retailBuyer: true
          }
        },
        product: true
      }
    });
    
    // If status changed to APPROVED or REJECTED, send email notification
    if (status === 'APPROVED' || status === 'REJECTED') {
      try {
        // Send notification email to the user
        await sendStatusUpdateEmail(updatedRequest, status, notes);
      } catch (emailError) {
        // Log the error but don't fail the request
        console.error('Error sending purchase request notification email:', emailError);
      }
    }
    
    return NextResponse.json({ 
      message: 'Purchase request updated successfully',
      purchaseRequest: updatedRequest
    });
  } catch (error) {
    console.error('Error updating purchase request:', error);
    return NextResponse.json({ error: 'Failed to update purchase request', details: error.message }, { status: 500 });
  }
}

async function sendStatusUpdateEmail(purchaseRequest, status, notes) {
  // Validate if we have user email
  if (!purchaseRequest.user?.email) {
    throw new Error('User email not found');
  }
  
  const userEmail = purchaseRequest.user.email;
  const userName = purchaseRequest.user.name || 'Valued Customer';
  const productName = purchaseRequest.product?.name || 'Requested product';
  const productImage = purchaseRequest.product?.images?.[0] || null;
  const quantity = purchaseRequest.quantity || 1;
  const buyerType = purchaseRequest.user.userType || '';
  const price = purchaseRequest.product?.price || null;
  const retailPrice = purchaseRequest.product?.retailPrice || (price ? Number(price) * 1.15 : null);
  const displayPrice = buyerType === 'RETAIL_BUYER' 
    ? (retailPrice ? `$${parseFloat(retailPrice).toFixed(2)}` : 'Price unavailable')
    : (price ? `$${parseFloat(price).toFixed(2)}` : 'Price unavailable');
  
  // Format the date
  const requestDate = purchaseRequest.createdAt 
    ? new Date(purchaseRequest.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown date';
    
  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  
  // Set email subject based on status
  const subject = status === 'APPROVED' 
    ? 'Your Purchase Request Has Been Approved' 
    : 'Update on Your Purchase Request';
  
  // Plain text email content
  const textContent = status === 'APPROVED'
    ? `
      Dear ${userName},
      
      Great news! Your purchase request for ${quantity} unit(s) of "${productName}" has been approved.
      
      Order Details:
      - Product: ${productName}
      - Quantity: ${quantity}
      - Price: ${displayPrice} ${buyerType === 'RETAIL_BUYER' ? '(retail)' : '(wholesale)'}
      - Request Date: ${requestDate}
      
      ${notes ? `Admin Notes: ${notes}` : ''}
      
      You can now proceed with the purchase. Please contact us if you have any questions about next steps.
      
      Thank you for your business!
      
      Regards,
      Your Company Team
    `
    : `
      Dear ${userName},
      
      We have reviewed your purchase request for ${quantity} unit(s) of "${productName}".
      
      Unfortunately, we are unable to approve this request at this time.
      
      Request Details:
      - Product: ${productName}
      - Quantity: ${quantity}
      - Request Date: ${requestDate}
      
      ${notes ? `Reason/Notes: ${notes}` : 'No specific reason was provided.'}
      
      If you have questions about this decision or would like to discuss alternatives, please contact our customer support team.
      
      Thank you for your understanding.
      
      Regards,
      Your Company Team
    `;
  
  // HTML email content
  const htmlContent = status === 'APPROVED'
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
          
          .product-container {
            display: flex;
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            align-items: center;
          }
          
          .product-image {
            width: 100px;
            height: 100px;
            border-radius: 6px;
            object-fit: cover;
            margin-right: 20px;
          }
          
          .product-info {
            flex: 1;
          }
          
          .product-name {
            font-weight: 500;
            font-size: 16px;
            color: #111827;
            margin-bottom: 8px;
          }
          
          .product-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          
          .meta-item {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 12px;
            color: #6b7280;
          }
          
          .price {
            color: #10b981;
            font-weight: 600;
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
          
          .message-box {
            background-color: #ecfdf5;
            border-left: 4px solid #10b981;
            padding: 20px;
            border-radius: 0 6px 6px 0;
            margin-top: 15px;
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
          
          .footer {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            padding: 20px 30px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          
          .notes {
            background-color: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            border-radius: 0 6px 6px 0;
            margin-top: 20px;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Purchase Request Approved!</h1>
            </div>
            
            <div class="content">
              <h2>Hello ${userName}</h2>
              <p>Great news! Your purchase request has been <strong>approved</strong>.</p>
              <span class="status-badge">Approved</span>
              
              <div class="product-container">
                ${productImage 
                  ? `<img src="${productImage}" alt="${productName}" class="product-image" />`
                  : `<div class="product-image" style="background-color: #e5e7eb; display: flex; align-items: center; justify-content: center;">
                      <span style="color: #9ca3af;">No Image</span>
                     </div>`
                }
                <div class="product-info">
                  <div class="product-name">${productName}</div>
                  <div class="product-meta">
                    <span class="meta-item">Quantity: ${quantity}</span>
                    <span class="meta-item price">${displayPrice}</span>
                    <span class="meta-item">${buyerType === 'RETAIL_BUYER' ? 'Retail' : 'Wholesale'}</span>
                    <span class="meta-item">Requested: ${requestDate}</span>
                  </div>
                </div>
              </div>
              
              ${notes 
                ? `<div class="notes">
                    <strong>Admin Notes:</strong>
                    <p>${notes}</p>
                   </div>`
                : ''
              }
              
             
           
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="/user/purchase-requests" class="button">View Your Approved Requests</a>
              </div>
            </div>
            
            <div class="footer">
              <p>If you have any questions, please contact our support team.</p>
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
          
          .product-container {
            display: flex;
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            align-items: center;
          }
          
          .product-image {
            width: 100px;
            height: 100px;
            border-radius: 6px;
            object-fit: cover;
            margin-right: 20px;
          }
          
          .product-info {
            flex: 1;
          }
          
          .product-name {
            font-weight: 500;
            font-size: 16px;
            color: #111827;
            margin-bottom: 8px;
          }
          
          .product-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          
          .meta-item {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 12px;
            color: #6b7280;
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
          
          .message-box {
            background-color: #f9fafb;
            border-left: 4px solid #6b7280;
            padding: 20px;
            border-radius: 0 6px 6px 0;
            margin-top: 15px;
          }
          
          .alternatives {
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
          
          .footer {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            padding: 20px 30px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          
          .notes {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            padding: 15px;
            border-radius: 0 6px 6px 0;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Purchase Request Update</h1>
            </div>
            
            <div class="content">
              <h2>Hello ${userName}</h2>
              <p>We have reviewed your purchase request for "${productName}".</p>
              <p>We regret to inform you that we are <strong>unable to approve this request</strong> at this time.</p>
              <span class="status-badge">Not Approved</span>
              
              <div class="product-container">
                ${productImage 
                  ? `<img src="${productImage}" alt="${productName}" class="product-image" />`
                  : `<div class="product-image" style="background-color: #e5e7eb; display: flex; align-items: center; justify-content: center;">
                      <span style="color: #9ca3af;">No Image</span>
                     </div>`
                }
                <div class="product-info">
                  <div class="product-name">${productName}</div>
                  <div class="product-meta">
                    <span class="meta-item">Quantity: ${quantity}</span>
                    <span class="meta-item">Requested: ${requestDate}</span>
                  </div>
                </div>
              </div>
              
              ${notes 
                ? `<div class="notes">
                    <strong>Reason/Notes:</strong>
                    <p>${notes}</p>
                   </div>`
                : `<div class="message-box">
                    <p>No specific reason was provided for this decision.</p>
                   </div>`
              }
              
              <div class="alternatives">
                <h2 style="margin-top: 0;">What Now?</h2>
                <p>You have several options:</p>
                <ul>
                  <li>Submit a new request with different specifications</li>
                  <li>Contact our customer support for more information</li>
                  <li>Browse alternative products in our catalog</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="/products" class="button">Browse Products</a>
              </div>
            </div>
            
            <div class="footer">
              <p>If you have any questions, please contact our support team.</p>
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
}