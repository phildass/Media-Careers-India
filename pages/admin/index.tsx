import { GetServerSideProps } from 'next'
import { isAuthenticated } from '@/lib/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs')

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-lavender-dark to-accent-red text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <Link href="/" className="hover:opacity-80 transition">
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="hover:opacity-80 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-300">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 font-semibold ${
                activeTab === 'jobs'
                  ? 'border-b-2 border-accent-red text-accent-red'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Manage Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 font-semibold ${
                activeTab === 'applications'
                  ? 'border-b-2 border-accent-red text-accent-red'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Applications
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Job Listings</h2>
              <button className="bg-accent-red text-white px-6 py-2 rounded-lg hover:bg-accent-red-dark transition">
                Add New Job
              </button>
            </div>
            <div className="text-gray-600">
              <p className="mb-4">Job management interface - To be implemented:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create new job listings</li>
                <li>Edit existing jobs</li>
                <li>Activate/Deactivate jobs</li>
                <li>View job analytics</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Applications</h2>
            <div className="text-gray-600">
              <p className="mb-4">Applications management interface - To be implemented:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>View all applications</li>
                <li>Filter by job, status, date</li>
                <li>Download resumes</li>
                <li>Update application status</li>
                <li>Contact applicants</li>
              </ul>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-accent-red mb-2">0</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-accent-red mb-2">0</div>
            <div className="text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-accent-red mb-2">0</div>
            <div className="text-gray-600">Companies</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!isAuthenticated(context.req)) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
