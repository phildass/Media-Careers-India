import Layout from '@/components/Layout'
import { GetServerSideProps } from 'next'
import { prisma } from '@/lib/prisma'
import { useState } from 'react'

interface Job {
  id: number
  title: string
  description: string
  location: string
  salary: string | null
  jobType: string
  experience: string | null
  skills: string | null
  company: {
    name: string
    description: string | null
    website: string | null
    logo: string | null
  }
  postedDate: string
}

interface JobDetailPageProps {
  job: Job | null
}

export default function JobDetailPage({ job }: JobDetailPageProps) {
  const [isApplying, setIsApplying] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  if (!job) {
    return (
      <Layout title="Job Not Found">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          </div>
        </div>
      </Layout>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplying(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('jobId', job.id.toString())
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('coverLetter', formData.coverLetter)
      if (resume) {
        formDataToSend.append('resume', resume)
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', coverLetter: '' })
        setResume(null)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitStatus('error')
    } finally {
      setIsApplying(false)
    }
  }

  const skills = job.skills ? JSON.parse(job.skills) : []

  return (
    <Layout title={job.title} description={`Apply for ${job.title} at ${job.company.name}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Job Details */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
          <p className="text-xl text-lavender-600 font-medium mb-6">{job.company.name}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{job.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-medium text-gray-900">{job.jobType}</p>
            </div>
            {job.salary && (
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="font-medium text-gray-900">{job.salary}</p>
              </div>
            )}
            {job.experience && (
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium text-gray-900">{job.experience}</p>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {skills.length > 0 && (
            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-lavender-100 text-lavender-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.company.description && (
            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">About {job.company.name}</h2>
              <p className="text-gray-700">{job.company.description}</p>
              {job.company.website && (
                <a
                  href={job.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lavender-600 hover:text-lavender-700 mt-2 inline-block"
                >
                  Visit Website →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Apply for this Position</h2>
          
          {submitStatus === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              Application submitted successfully! We&apos;ll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              Failed to submit application. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                Resume (PDF or DOC) *
              </label>
              <input
                type="file"
                id="resume"
                required
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                rows={6}
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                placeholder="Tell us why you&apos;re a great fit for this role..."
              />
            </div>

            <button
              type="submit"
              disabled={isApplying}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplying ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!

  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id as string) },
      include: {
        company: true,
      },
    })

    if (!job || !job.isActive) {
      return {
        props: {
          job: null,
        },
      }
    }

    return {
      props: {
        job: JSON.parse(JSON.stringify(job)),
      },
    }
  } catch (error) {
    console.error('Error fetching job:', error)
    return {
      props: {
        job: null,
      },
    }
  }
}
