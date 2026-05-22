import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set headers for CORS and preflight requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, and message are required." });
  }

  const smtpHost = process.env.SMTP_HOST || "eta.stormerhost.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER || "info@richkissgh.com";
  const smtpPass = process.env.SMTP_PASS;

  // Real-time console fallback logging if SMTP secrets are missing
  if (!smtpPass) {
    console.log("-----------------------------------------");
    console.log("VERCEL SERVERLESS: CONTACT MESSAGE LOG");
    console.log(`Sender: ${name} <${email}>`);
    console.log(`Subject: ${subject || "N/A"}`);
    console.log(`Content:\n${message}`);
    console.log("-----------------------------------------");

    return res.status(200).json({
      success: true,
      fallback: true,
      message: "Your message was captured in Vercel Serverless Logs! (To dispatch real emails, please define the SMTP_PASS environment variable in your Vercel project settings.)"
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // True if SSL port 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // To prevent spoofing spam filters, from is smtpUser, replyTo is user's mail
      replyTo: email,
      to: "info@richkissgh.com",
      subject: subject ? `Contact Form: ${subject}` : "New Contact Form Submission",
      text: `New contact submission from ${name} (${email}):\n\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 8px;">
          <h2 style="color: #ff5722; font-family: Georgia, serif; border-bottom: 2px solid #ff5722; padding-bottom: 12px; margin-top: 0; font-weight: normal;">New Contact Message</h2>
          <p style="margin: 12px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ff5722; text-decoration: none;">${email}</a></p>
          <p style="margin: 12px 0;"><strong>Subject:</strong> ${subject || "N/A"}</p>
          <div style="background-color: #fcfcfc; padding: 18px; border-left: 4px solid #ff5722; margin-top: 24px; border-radius: 4px; white-space: pre-wrap; font-size: 14px; color: #444;">
            <strong style="display: block; margin-bottom: 8px; color: #111;">Message Content:</strong>
            ${message.replace(/\r?\n/g, "<br/>")}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Vercel Serverless Nodemailer transmit failure:", error);
    return res.status(500).json({
      error: "SMTP gateway transmission failed on Vercel backend. Please try again or construct an email direct.",
      details: error.message || "Unknown SMTP error"
    });
  }
}
