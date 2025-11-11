import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File } from 'formidable'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadDir = path.join(process.cwd(), 'uploads', 'resumes')

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

interface FormFields {
  jobId: string[]
  name: string[]
  email: string[]
  phone?: string[]
  coverLetter?: string[]
}

interface FormFiles {
  resume?: File | File[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filter: (part) => {
        return (
          part.mimetype?.includes('pdf') ||
          part.mimetype?.includes('msword') ||
          part.mimetype?.includes('wordprocessingml') ||
          false
        )
      },
    })

    const [fields, files] = await new Promise<[FormFields, FormFiles]>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err)
          resolve([fields as FormFields, files as FormFiles])
        })
      }
    )

    const jobId = parseInt(fields.jobId[0])
    const name = fields.name[0]
    const email = fields.email[0]
    const phone = fields.phone?.[0] || ''
    const coverLetter = fields.coverLetter?.[0] || ''

    if (!jobId || !name || !email) {
      return res.status(400).json({ 
        message: 'Missing required fields: jobId, name, email' 
      })
    }

    // Get job details
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    })

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    // Handle resume file
    let resumePath = ''
    if (files.resume) {
      const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume
      const ext = path.extname(resumeFile.originalFilename || '.pdf')
      const newFilename = `${Date.now()}-${name.replace(/\s+/g, '-')}${ext}`
      const newPath = path.join(uploadDir, newFilename)
      
      fs.renameSync(resumeFile.filepath, newPath)
      resumePath = `/uploads/resumes/${newFilename}`
    }

    // Save application to database
    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        phone,
        coverLetter,
        resumePath,
      },
    })

    // Send email notification
    const emailContent = `
New Job Application Received

Job: ${job.title}
Company: ${job.company.name}

Applicant Details:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Cover Letter:
${coverLetter || 'Not provided'}

Resume: ${resumePath ? `Available at ${resumePath}` : 'Not uploaded'}

Application ID: ${application.id}
Applied At: ${new Date().toLocaleString()}
    `.trim()

    await sendEmail({
      to: process.env.APP_EMAIL || 'info@phildass.com',
      subject: `New Application: ${job.title} - ${name}`,
      text: emailContent,
      attachments: resumePath
        ? [
            {
              filename: path.basename(resumePath),
              path: path.join(process.cwd(), resumePath),
            },
          ]
        : undefined,
    })

    return res.status(200).json({
      message: 'Application submitted successfully',
      applicationId: application.id,
    })
  } catch (error) {
    console.error('Error processing application:', error)
    return res.status(500).json({ 
      message: 'Failed to process application',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
