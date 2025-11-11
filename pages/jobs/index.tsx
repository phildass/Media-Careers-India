import Layout from '@/components/Layout'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { prisma } from '@/lib/prisma'

interface Job {
  id: number
  title: string
  location: string | null
  salary: string | null
  jobType: string | null
  postedDate: string
  company: {
    name: string
    location: string | null
  }
}

interface JobsPageProps {
  jobs: Job[]
}

export default function JobsPage({ jobs }: JobsPageProps) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Media Jobs in India</h1>
          <p className="text-lg text-gray-600">
            Browse the latest opportunities in journalism, broadcasting, digital media, and more
          </p>
        </div>

        {/* Filters - Placeholder */}
        <div className="mb-8 p-4 bg-primary-lavender rounded-lg">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark"
            />
            <select className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark">
              <option value="">All Locations</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
            </select>
            <select className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark">
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
            </select>
            <button className="px-4 py-2 bg-accent-red text-white rounded hover:bg-accent-red-dark transition">
              Search
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600 mb-4">No jobs available yet</p>
              <p className="text-gray-500">Check back soon for new opportunities!</p>
            </div>
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary-lavender-dark hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                    <p className="text-lg text-gray-700 mb-3">{job.company.name}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {job.location && (
                        <span className="flex items-center gap-1">
                          📍 {job.location}
                        </span>
                      )}
                      {job.jobType && (
                        <span className="flex items-center gap-1">
                          💼 {job.jobType}
                        </span>
                      )}
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          💰 {job.salary}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
      },
      include: {
        company: true,
      },
      orderBy: {
        postedDate: 'desc',
      },
      take: 50,
    })

    return {
      props: {
        jobs: jobs.map(job => ({
          ...job,
          postedDate: job.postedDate.toISOString(),
          createdAt: job.createdAt.toISOString(),
          updatedAt: job.updatedAt.toISOString(),
          expiryDate: job.expiryDate?.toISOString() || null,
        })),
      },
    }
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return {
      props: {
        jobs: [],
      },
    }
  }
}
