import Layout from '@/components/Layout'

export default function MembershipPage() {
  return (
    <Layout title="Membership" description="Join MediaCareers.in Premium Membership">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">
          Premium Membership
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Unlock exclusive benefits and accelerate your media career
        </p>

        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-lavender-600 to-lavender-800 rounded-2xl shadow-xl p-8 text-white mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Premium Membership</h2>
            <div className="text-5xl font-bold mb-4">
              ₹199
              <span className="text-xl font-normal"> / 3 months</span>
            </div>
            <p className="text-lavender-100 mb-6">
              Get premium access to all features and exclusive job listings
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Membership Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">✨</div>
              <div>
                <h3 className="font-semibold text-gray-900">Priority Job Alerts</h3>
                <p className="text-gray-600">
                  Get notified first about new job postings before they go public
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="font-semibold text-gray-900">Exclusive Listings</h3>
                <p className="text-gray-600">
                  Access premium job listings available only to members
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">📝</div>
              <div>
                <h3 className="font-semibold text-gray-900">Resume Review</h3>
                <p className="text-gray-600">
                  AI-powered resume parsing and improvement suggestions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💬</div>
              <div>
                <h3 className="font-semibold text-gray-900">Cover Letter Generator</h3>
                <p className="text-gray-600">
                  AI-assisted cover letter creation for each application
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🏆</div>
              <div>
                <h3 className="font-semibold text-gray-900">Profile Boost</h3>
                <p className="text-gray-600">
                  Stand out to employers with a verified premium badge
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">📊</div>
              <div>
                <h3 className="font-semibold text-gray-900">Career Analytics</h3>
                <p className="text-gray-600">
                  Track your applications and get insights on your job search
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">How to Subscribe</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-lavender-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Make Payment via UPI</h3>
                <p className="text-gray-600">
                  Send ₹199 to our UPI ID or scan the QR code below. The UPI QR code will be 
                  displayed here once uploaded by the admin.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-lavender-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Send Payment Proof</h3>
                <p className="text-gray-600">
                  Email your payment screenshot and registered email to info@phildass.com
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-lavender-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Get Activated</h3>
                <p className="text-gray-600">
                  Your membership will be activated within 24 hours after verification
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              <strong>Note:</strong> UPI QR code will be displayed here. Contact admin if you 
              need immediate assistance.
            </p>
          </div>
        </div>

        {/* Free Membership Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Free Membership for Freshers
          </h2>
          <p className="text-gray-700 mb-4">
            We believe in supporting aspiring media professionals. Junior professionals and 
            freshers may be eligible for free membership under certain conditions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>
              <strong>Eligibility:</strong> Professionals with less than 1 year of experience 
              in the media industry
            </li>
            <li>
              <strong>Application:</strong> Submit your resume for automated eligibility check 
              via our AI-powered resume parser
            </li>
            <li>
              <strong>Duration:</strong> Free membership valid for 3 months, renewable based on 
              career progress
            </li>
            <li>
              <strong>Verification:</strong> Resume will be reviewed to confirm experience level 
              and career stage
            </li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            Note: Resume parsing and eligibility verification features are currently being 
            developed and will be available soon. Contact us at info@phildass.com for manual 
            verification in the meantime.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Questions?</h3>
          <p className="text-gray-600">
            Contact us at{' '}
            <a href="mailto:info@phildass.com" className="text-lavender-600 hover:text-lavender-700">
              info@phildass.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}
