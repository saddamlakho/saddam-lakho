import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message, subject } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER || 'saddamlakho09@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailAppPassword) {
      console.warn('GMAIL_APP_PASSWORD is not set in environment variables. Please add it to .env.local');
      // For development simulation when env password is not yet entered
      return NextResponse.json({
        success: true,
        mock: true,
        message: 'Form received successfully! (Add GMAIL_APP_PASSWORD to .env.local for live Gmail dispatch)'
      });
    }

    // Configure Nodemailer Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const emailSubject = subject || `🚀 New Portfolio Inquiry from ${name}`;
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });

    // Luxury Styled HTML Email for Saddam Lakho
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060709; color: #F1F5F9; margin: 0; padding: 30px 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #0D1017; border: 1px solid rgba(229, 184, 105, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
          .header { background: linear-gradient(135deg, #161A24 0%, #0D1017 100%); padding: 30px; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: center; }
          .badge { display: inline-block; padding: 6px 14px; background-color: rgba(229, 184, 105, 0.15); border: 1px solid #E5B869; color: #E5B869; border-radius: 50px; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; }
          .title { font-size: 22px; font-weight: 800; color: #FFFFFF; margin: 0; }
          .body { padding: 30px; }
          .field-group { margin-bottom: 22px; background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 16px; border-radius: 12px; }
          .label { font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; font-weight: 600; }
          .value { font-size: 15px; color: #F8FAFC; font-weight: 500; word-break: break-word; }
          .value a { color: #E5B869; text-decoration: none; }
          .message-box { background-color: rgba(229, 184, 105, 0.04); border-left: 3px solid #E5B869; padding: 18px; border-radius: 0 12px 12px 0; margin-top: 10px; font-size: 15px; line-height: 1.6; color: #E2E8F0; white-space: pre-wrap; }
          .footer { padding: 20px 30px; background-color: #080A0E; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; font-size: 12px; color: #64748B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">NEW PORTFOLIO INQUIRY</div>
            <h1 class="title">You received a new message</h1>
          </div>
          <div class="body">
            <div class="field-group">
              <div class="label">Sender Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field-group">
              <div class="label">Sender Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field-group">
              <div class="label">Date & Time (PKT)</div>
              <div class="value">${timestamp}</div>
            </div>
            <div class="field-group">
              <div class="label">Project Scope / Message</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            Saddam Lakho Portfolio Engine · Full-Stack & AI Systems
          </div>
        </div>
      </body>
      </html>
    `;

    // Send Mail to Saddam Lakho
    await transporter.sendMail({
      from: `"Saddam Lakho Portfolio" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: emailSubject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: htmlTemplate,
    });

    return NextResponse.json({
      success: true,
      message: 'Message delivered to Saddam Lakho inbox!'
    });

  } catch (error) {
    console.error('Nodemailer error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send message via SMTP' },
      { status: 500 }
    );
  }
}
