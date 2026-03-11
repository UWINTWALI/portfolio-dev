import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const RECIPIENT = 'uwintwalijeandedieu3@gmail.com';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, senderEmail, socialId, message } = req.body as {
    name?: string;
    senderEmail: string;
    socialId?: string;
    message: string;
  };

  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!process.env.GMAIL_APP_PASSWORD) {
    console.error('GMAIL_APP_PASSWORD is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const displayName = name?.trim() || 'Anonymous';

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: RECIPIENT,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${RECIPIENT}>`,
      to: RECIPIENT,
      replyTo: senderEmail || undefined,
      subject: `Portfolio message from ${displayName}`,
      text: [
        `Name: ${displayName}`,
        `Email: ${senderEmail || 'Not provided'}`,
        socialId ? `Social: ${socialId}` : '',
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#333;margin-top:0">📬 New message from your portfolio</h2>
          <table style="border-collapse:collapse;width:100%;background:#f9f9f9;border-radius:8px;overflow:hidden">
            <tr>
              <td style="padding:10px 14px;font-weight:600;color:#555;width:100px;background:#f0f0f0">Name</td>
              <td style="padding:10px 14px;color:#333">${displayName}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;font-weight:600;color:#555;background:#f0f0f0">Email</td>
              <td style="padding:10px 14px;color:#333">${senderEmail || 'Not provided'}</td>
            </tr>
            ${
              socialId
                ? `<tr>
              <td style="padding:10px 14px;font-weight:600;color:#555;background:#f0f0f0">Social</td>
              <td style="padding:10px 14px;color:#333">${socialId}</td>
            </tr>`
                : ''
            }
          </table>
          <div style="margin-top:20px;padding:16px;background:#fff;border:1px solid #eee;border-radius:8px;color:#333;line-height:1.7;white-space:pre-wrap">${message
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br/>')}</div>
          <p style="margin-top:16px;color:#999;font-size:12px">Sent from uwintwali portfolio contact form</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
