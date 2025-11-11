import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
  attachments?: Array<{
    filename: string
    path: string
  }>
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER

  if (!smtpConfigured) {
    // Log to console in development when SMTP not configured
    console.log('📧 Email would be sent (SMTP not configured):')
    console.log('To:', options.to)
    console.log('Subject:', options.subject)
    console.log('Body:', options.text || options.html)
    if (options.attachments) {
      console.log('Attachments:', options.attachments.map(a => a.filename).join(', '))
    }
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments,
  })

  console.log('✅ Email sent to:', options.to)
}
