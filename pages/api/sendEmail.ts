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

  const { senderEmail, socialId, message } = req.body as {
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
      subject: `Portfolio message from ${senderEmail || 'Anonymous'}`,
      text: [
        `From: ${senderEmail || 'Anonymous'}`,
        socialId ? `Social: ${socialId}` : '',
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#333">New message from your portfolio</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:8px;font-weight:bold;color:#555;width:120px">From</td>
              <td style="padding:8px;color:#333">${senderEmail || 'Anonymous'}</td>
            </tr>
            ${
              socialId
                ? `<tr>
              <td style="padding:8px;font-weight:bold;color:#555">Social</td>
              <td style="padding:8px;color:#333">${socialId}</td>
            </tr>`
                : ''
            }
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
          <div style="padding:8px;color:#333;line-height:1.6;white-space:pre-wrap">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')}</div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
