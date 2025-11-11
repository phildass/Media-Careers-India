import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface AdminPageProps {
  jobs: Array<{
    id: number
    title: string
    company: { name: string }
    isActive: boolean
    postedDate: string
  }>
  applications: Array<{
    id: number
    name: string
    email: string
    job: { title: string }
    createdAt: string
    status: string
  }>
}

export default function AdminDashboard({ jobs, applications }: AdminPageProps) {
  const router = useRouter()
  const [isAddingJob, setIsAddingJob] = useState(false)
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    experience: '',
    companyName: '',
  })

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement job creation API
    console.log('Adding job:', jobForm)
    setIsAddingJob(false)
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | MediaCareers.in</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        {/* Admin Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Total Jobs</h3>
              <p className="text-3xl font-bold text-lavender-600">{jobs.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Active Jobs</h3>
              <p className="text-3xl font-bold text-green-600">
                {jobs.filter(j => j.isActive).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Applications</h3>
              <p className="text-3xl font-bold text-blue-600">{applications.length}</p>
            </div>
          </div>

          {/* Add Job Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsAddingJob(true)}
              className="btn-primary"
            >
              + Add New Job
            </button>
          </div>

          {/* Add Job Form Modal */}
          {isAddingJob && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Add New Job</h2>
                <form onSubmit={handleAddJob} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.companyName}
                      onChange={(e) => setJobForm({ ...jobForm, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={jobForm.description}
                      onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        required
                        value={jobForm.location}
                        onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Type
                      </label>
                      <select
                        value={jobForm.jobType}
                        onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end mt-6">
                    <button
                      type="button"
                      onClick={() => setIsAddingJob(false)}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Add Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Jobs List */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Jobs</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {jobs.length === 0 ? (
                <p className="px-6 py-4 text-gray-500">No jobs yet. Add your first job!</p>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.company.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {applications.length === 0 ? (
                <p className="px-6 py-4 text-gray-500">No applications yet.</p>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{app.name}</h3>
                        <p className="text-sm text-gray-500">{app.email}</p>
                        <p className="text-sm text-lavender-600 mt-1">Applied for: {app.job.title}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            app.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : app.status === 'reviewed'
                              ? 'bg-blue-100 text-blue-800'
                              : app.status === 'shortlisted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {app.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession<SessionData>(req, res, sessionOptions)

  if (!session.isLoggedIn) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: {
          select: { name: true },
        },
      },
      orderBy: { postedDate: 'desc' },
    })

    const applications = await prisma.application.findMany({
      include: {
        job: {
          select: { title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    return {
      props: {
        jobs: JSON.parse(JSON.stringify(jobs)),
        applications: JSON.parse(JSON.stringify(applications)),
      },
    }
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return {
      props: {
        jobs: [],
        applications: [],
      },
    }
  }
}
