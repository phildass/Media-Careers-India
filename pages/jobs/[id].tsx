import Layout from '@/components/Layout'
import { GetServerSideProps } from 'next'
import { prisma } from '@/lib/prisma'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface Job {
  id: number
  title: string
  description: string
  location: string | null
  salary: string | null
  jobType: string | null
  experience: string | null
  skills: string | null
  postedDate: string
  company: {
    name: string
    website: string | null
    description: string | null
    location: string | null
  }
}

interface JobDetailsPageProps {
  job: Job | null
}

export default function JobDetailsPage({ job }: JobDetailsPageProps) {
  const router = useRouter()
  const [isApplying, setIsApplying] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <a href="/jobs" className="text-accent-red hover:underline">
            Back to Jobs
          </a>
        </div>
      </Layout>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

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
        alert('Application submitted successfully!')
        setIsApplying(false)
        setFormData({ name: '', email: '', phone: '', coverLetter: '' })
        setResume(null)
      } else {
        const error = await response.json()
        alert(`Error: ${error.message || 'Failed to submit application'}`)
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
            <div className="text-xl text-gray-700 mb-4">{job.company.name}</div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {job.location && (
                <span className="px-4 py-2 bg-primary-lavender rounded-full text-sm">
                  📍 {job.location}
                </span>
              )}
              {job.jobType && (
                <span className="px-4 py-2 bg-primary-lavender rounded-full text-sm">
                  💼 {job.jobType}
                </span>
              )}
              {job.salary && (
                <span className="px-4 py-2 bg-primary-lavender rounded-full text-sm">
                  💰 {job.salary}
                </span>
              )}
              {job.experience && (
                <span className="px-4 py-2 bg-primary-lavender rounded-full text-sm">
                  🎯 {job.experience}
                </span>
              )}
            </div>

            <button
              onClick={() => setIsApplying(!isApplying)}
              className="w-full md:w-auto bg-accent-red text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent-red-dark transition"
            >
              {isApplying ? 'Cancel Application' : 'Apply Now'}
            </button>
          </div>

          {/* Application Form */}
          {isApplying && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this position</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Resume * (PDF, DOC, DOCX)
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={6}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark"
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent-red text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent-red-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}

          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {job.description}
            </div>
          </div>

          {/* Skills */}
          {job.skills && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.split(',').map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-lavender text-gray-800 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Company Info */}
          {job.company.description && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {job.company.name}</h2>
              <p className="text-gray-700 mb-4">{job.company.description}</p>
              {job.company.website && (
                <a
                  href={job.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-red hover:underline"
                >
                  Visit Website →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }

  try {
    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(id),
      },
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
        job: {
          ...job,
          postedDate: job.postedDate.toISOString(),
          createdAt: job.createdAt.toISOString(),
          updatedAt: job.updatedAt.toISOString(),
          expiryDate: job.expiryDate?.toISOString() || null,
        },
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
