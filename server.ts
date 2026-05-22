import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Secure Nodemailer API SMTP endpoint for contact submissions
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields: name, email, and message are required." });
    }

    const smtpHost = process.env.SMTP_HOST || "eta.stormerhost.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER || "info@richkissgh.com";
    const smtpPass = process.env.SMTP_PASS;

    // Graceful logging for development or if the secret was not configured yet in the admin panel
    if (!smtpPass) {
      console.log("-----------------------------------------");
      console.log("CONTACT SUBMISSION RECEIVED (DEVELOPMENT/CONSOLE PLAYGROUND MODE)");
      console.log(`Sender: ${name} <${email}>`);
      console.log(`Subject: ${subject || "N/A"}`);
      console.log(`Content:\n${message}`);
      console.log("Helpful Reminder: Set SMTP_PASS in your environment secrets to send real emails.");
      console.log("-----------------------------------------");

      return res.status(200).json({
        success: true,
        fallback: true,
        message: "Your message was captured! (Development test logging mode is active because SMTP_PASS is not set yet in your environment variables. Please provide the secret to send real emails!)"
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // SSL port
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 8000,   // Fail fast in 8s if host is unreachable
        greetingTimeout: 8000,     // Fail in 8s if SMTP server fails to greet
        socketTimeout: 10000,      // Fail in 10s if socket is idle
        tls: {
          rejectUnauthorized: false // Don't reject unofficial or cPanel SSL certificates
        }
      } as any);

      const mailOptions = {
        from: `"${name}" <${smtpUser}>`, // Must match SMTP user to avoid spoofing rejections, but sets replyTo
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
    } catch (error: any) {
      console.error("Nodemailer transmission failed:", error);
      return res.status(500).json({
        error: "SMTP gateway transmission failed. Please try again or construct an email direct.",
        details: error.message || "Unknown SMTP error"
      });
    }
  });

  // Use Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Explicit SPA fallback for non-matched routes in dev
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      // Skip if it looks like an asset
      if (url.includes('.') && !url.endsWith('.html')) {
        return next();
      }
      try {
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
