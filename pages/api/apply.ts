import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File } from 'formidable'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import fs from 'fs/promises'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Parse form data
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    })

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await fs.mkdir(uploadDir, { recursive: true })
    } catch {
      // Directory might already exist
    }

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err)
          else resolve([fields, files])
        })
      }
    )

    // Extract field values
    const jobId = parseInt(Array.isArray(fields.jobId) ? fields.jobId[0] : fields.jobId || '0')
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name || ''
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email || ''
    const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone || ''
    const coverLetter = Array.isArray(fields.coverLetter) ? fields.coverLetter[0] : fields.coverLetter || ''

    // Handle resume file
    let resumePath: string | null = null
    const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume

    if (resumeFile) {
      const file = resumeFile as File
      resumePath = `/uploads/${path.basename(file.filepath)}`
    }

    // Verify job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    })

    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    // Create application in database
    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        phone,
        resumePath,
        coverLetter,
        status: 'pending',
      },
    })

    // Send email notification
    const emailTo = process.env.APPLICATION_EMAIL || 'info@phildass.com'
    await sendEmail({
      to: emailTo,
      subject: `New Job Application: ${job.title}`,
      text: `
New application received for: ${job.title} at ${job.company.name}

Applicant Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

${coverLetter ? `Cover Letter:\n${coverLetter}` : ''}

Resume: ${resumePath ? `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${resumePath}` : 'Not provided'}

Application ID: ${application.id}
      `,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${job.title}</p>
        <p><strong>Company:</strong> ${job.company.name}</p>
        
        <h3>Applicant Details</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        
        ${coverLetter ? `<h3>Cover Letter</h3><p>${coverLetter.replace(/\n/g, '<br>')}</p>` : ''}
        
        ${resumePath ? `<p><strong>Resume:</strong> <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${resumePath}">View Resume</a></p>` : ''}
        
        <p><small>Application ID: ${application.id}</small></p>
      `,
    })

    return res.status(200).json({
      success: true,
      applicationId: application.id,
    })
  } catch (error) {
    console.error('Error processing application:', error)
    return res.status(500).json({ error: 'Failed to process application' })
  }
}
