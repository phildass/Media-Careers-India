import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-lavender via-white to-primary-lavender py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Gateway to{' '}
            <span className="text-accent-red">Media Careers</span>{' '}
            in India
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Find opportunities in journalism, broadcasting, digital media, PR, content creation, and more.
            Connect with top media companies across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="bg-accent-red text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-red-dark transition shadow-lg"
            >
              Browse Jobs
            </Link>
            <Link
              href="/membership"
              className="bg-primary-lavender-dark text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition shadow-lg"
            >
              Get Premium Membership
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose MediaCareers.in?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border-2 border-primary-lavender rounded-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Curated Jobs</h3>
              <p className="text-gray-600">
                Hand-picked opportunities from top media companies across journalism, broadcasting, and digital content.
              </p>
            </div>
            <div className="p-6 border-2 border-primary-lavender rounded-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Smart Matching</h3>
              <p className="text-gray-600">
                Our AI-powered resume parser helps match your skills with the right opportunities in the media industry.
              </p>
            </div>
            <div className="p-6 border-2 border-primary-lavender rounded-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Premium Support</h3>
              <p className="text-gray-600">
                Get access to premium features, career guidance, and early job alerts for just ₹199 for 3 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-lavender-dark to-accent-red py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Media Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of media professionals who have found their dream jobs through MediaCareers.in
          </p>
          <Link
            href="/jobs"
            className="bg-white text-accent-red px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition inline-block shadow-lg"
          >
            Explore Opportunities
          </Link>
        </div>
      </section>
    </Layout>
  )
}
