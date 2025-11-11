import Layout from '@/components/Layout'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { prisma } from '@/lib/prisma'

interface Job {
  id: number
  title: string
  description: string
  location: string
  salary: string | null
  jobType: string
  company: {
    name: string
    logo: string | null
  }
  postedDate: string
}

interface JobsPageProps {
  jobs: Job[]
}

export default function JobsPage({ jobs }: JobsPageProps) {
  return (
    <Layout title="Browse Jobs" description="Find your next media career opportunity">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Browse Jobs</h1>
        
        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">No jobs available at the moment.</p>
            <p className="text-gray-500">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 block"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h2>
                    <p className="text-lavender-600 font-medium mb-3">{job.company.name}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.jobType}</span>
                      {job.salary && <span>💰 {job.salary}</span>}
                    </div>
                    <p className="text-gray-600 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="ml-4 text-sm text-gray-500">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
      orderBy: { postedDate: 'desc' },
    })

    return {
      props: {
        jobs: JSON.parse(JSON.stringify(jobs)),
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
