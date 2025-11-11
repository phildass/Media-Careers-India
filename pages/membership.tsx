import Layout from '@/components/Layout'

export default function Membership() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Membership
            </h1>
            <p className="text-xl text-gray-600">
              Unlock exclusive benefits and accelerate your media career
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-primary-lavender to-white rounded-lg shadow-xl p-8 mb-12 border-2 border-primary-lavender-dark">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-accent-red mb-2">₹199</div>
              <div className="text-xl text-gray-700">for 3 months</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <strong className="text-gray-900">Early Job Alerts</strong>
                  <p className="text-gray-600">Get notified about new opportunities before they&apos;re public</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <strong className="text-gray-900">Resume Analysis</strong>
                  <p className="text-gray-600">AI-powered resume parsing and improvement suggestions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <strong className="text-gray-900">Cover Letter Generator</strong>
                  <p className="text-gray-600">AI-assisted cover letters tailored to each job</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <strong className="text-gray-900">Priority Support</strong>
                  <p className="text-gray-600">Direct assistance with your job search</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <strong className="text-gray-900">Career Resources</strong>
                  <p className="text-gray-600">Exclusive guides, templates, and industry insights</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-accent-red text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-accent-red-dark transition shadow-lg">
                Get Premium Access
              </button>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Pay</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 1: Make UPI Payment</h3>
                <p className="text-gray-700 mb-3">
                  Send ₹199 via UPI to complete your premium membership registration.
                </p>
                <div className="bg-primary-lavender p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Payment Details:</p>
                  <p className="font-mono text-gray-800">
                    <strong>Amount:</strong> ₹199<br />
                    <strong>UPI ID:</strong> [Admin will upload QR code]
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 2: Send Confirmation</h3>
                <p className="text-gray-700">
                  After making the payment, email your transaction screenshot to{' '}
                  <a href="mailto:info@phildass.com" className="text-accent-red hover:underline">
                    info@phildass.com
                  </a>
                  {' '}along with:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-700 space-y-1">
                  <li>Your full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Transaction ID</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 3: Account Activation</h3>
                <p className="text-gray-700">
                  Your premium membership will be activated within 24 hours of payment verification. 
                  You&apos;ll receive a confirmation email with access instructions.
                </p>
              </div>
            </div>
          </div>

          {/* Free Membership Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Free Membership Eligibility</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We believe in supporting fresh talent in the media industry. 
                <strong className="text-gray-900"> Free premium membership</strong> is available to:
              </p>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">
                  Eligible Candidates:
                </h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span>🎓</span>
                    <span>Fresh graduates (within 1 year of graduation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>💼</span>
                    <span>Junior professionals with less than 1 year of experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📝</span>
                    <span>First-time job seekers in media industry</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How to Apply for Free Membership:
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Upload your resume when applying for jobs</li>
                  <li>Our AI system will automatically analyze your experience level</li>
                  <li>If eligible, you&apos;ll receive free premium access for 3 months</li>
                  <li>Manual verification may be required in some cases</li>
                </ol>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Resume parsing and eligibility verification is automated. 
                  If you believe you qualify but weren&apos;t automatically approved, please contact us at{' '}
                  <a href="mailto:info@phildass.com" className="text-accent-red hover:underline">
                    info@phildass.com
                  </a>.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I cancel my membership?
                </h3>
                <p className="text-gray-700">
                  Yes, you can cancel anytime. However, payments are non-refundable. 
                  Your premium access will continue until the end of your paid period.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What happens after 3 months?
                </h3>
                <p className="text-gray-700">
                  You can renew your membership for another 3 months at the same price. 
                  We&apos;ll send you a reminder before your membership expires.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Is my payment information secure?
                </h3>
                <p className="text-gray-700">
                  Yes, all payments are processed through secure UPI infrastructure. 
                  We do not store any payment information on our servers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What if I need help?
                </h3>
                <p className="text-gray-700">
                  Contact us at{' '}
                  <a href="mailto:info@phildass.com" className="text-accent-red hover:underline">
                    info@phildass.com
                  </a>
                  {' '}and we&apos;ll assist you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
