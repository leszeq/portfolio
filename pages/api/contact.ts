import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, subject, message, location, area, services, consent } = req.body;

  // Basic server-side validation
  if (!name || !email || !message || !consent) {
    return res.status(400).json({ success: false, message: 'Bad Request. Missing required fields.' });
  }

  const servicesText = services && services.length > 0
    ? services.join(', ')
    : 'Brak';

  const locationAreaText = `Lokalizacja: ${location || 'Brak'}\nMetraż: ${area || 'Brak'}`;

  // Nodemailer Config
  const transporter = nodemailer.createTransport({
    // Ustawienia dla Gmail. Możesz to zmienić na inny serwer SMTP, jeśli masz taką potrzebę.
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'arch.nataliaf@gmail.com', // Twój adres docelowy
    subject: `Nowe Zapytanie z Portfolio: ${subject || 'Brak Tematu'}`,
    text: `
Otrzymałeś nową wiadomość z formularza kontaktowego na stronie!

Od: ${name} (${email})

Szczegóły Inwestycji:
${locationAreaText}
Interesujące usługi: ${servicesText}

Treść wiadomości:
${message}

Zgody:
RODO zaakceptowane: ${consent ? 'TAK' : 'NIE'}
    `,
    html: `
      <h2>Nowe Zapytanie z Portfolio</h2>
      <p>Otrzymałeś nową wiadomość z formularza kontaktowego na stronie!</p>
      <br />
      <p><strong>Od:</strong> ${name} (${email})</p>
      <br />
      <p><strong>Szczegóły Inwestycji:</strong><br />
      Lokalizacja: ${location || 'Brak'}<br />
      Metraż: ${area || 'Brak'}</p>
      <p><strong>Interesujące usługi:</strong> ${servicesText}</p>
      <br />
      <p><strong>Treść wiadomości:</strong><br />
      ${message.replace(/\n/g, '<br />')}</p>
      <br />
      <p><small>Zgody:<br />RODO zaakceptowane: ${consent ? 'TAK' : 'NIE'}</small></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
}
