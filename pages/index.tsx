import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout
      title="Home"
      description="MediaCareers.in - Your gateway to media careers across India"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lavender-600 to-lavender-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Gateway to Media Careers in India
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-lavender-100">
              Discover opportunities in journalism, broadcasting, digital media, PR, and content creation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs" className="btn-secondary">
                Browse Jobs
              </Link>
              <Link href="/membership" className="btn-outline bg-white hover:bg-gray-100">
                <span className="text-lavender-600 hover:text-lavender-700">Join as Member</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why MediaCareers.in?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Curated Opportunities</h3>
              <p className="text-gray-600">
                Hand-picked jobs from top media companies across India
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Industry Focused</h3>
              <p className="text-gray-600">
                Specializing in journalism, broadcasting, digital media, and PR
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Career Growth</h3>
              <p className="text-gray-600">
                Resources, guides, and community support for your career journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Start?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join MediaCareers.in today and take the next step in your media career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs" className="btn-primary">
              Explore Jobs
            </Link>
            <Link href="/membership" className="btn-secondary">
              Become a Member
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
