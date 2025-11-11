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

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env

  // If SMTP is not configured, log to console instead
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('📧 EMAIL (Console Mode - SMTP not configured):')
    console.log('To:', options.to)
    console.log('Subject:', options.subject)
    console.log('Body:', options.text || options.html)
    if (options.attachments) {
      console.log('Attachments:', options.attachments.map(a => a.filename).join(', '))
    }
    console.log('---')
    return true
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587'),
      secure: SMTP_PORT === '465',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    })

    console.log('✅ Email sent successfully to:', options.to)
    return true
  } catch (error) {
    console.error('❌ Error sending email:', error)
    return false
  }
}
