import Layout from '@/components/Layout'

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p>
                MediaCareers.in ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
              <p>When you apply for jobs or register for membership, we may collect:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Resume and career-related information</li>
                <li>Educational and professional background</li>
                <li>Job preferences and skills</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Usage Information</h3>
              <p>We automatically collect certain information when you visit our website:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>IP address and browser type</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Process your job applications</li>
                <li>Match you with relevant job opportunities</li>
                <li>Communicate with you about jobs and services</li>
                <li>Improve our website and services</li>
                <li>Send newsletters and updates (with your consent)</li>
                <li>Verify membership eligibility</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Employers when you apply for jobs</li>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="mt-4">
                We will never sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect 
                your personal information. However, no method of transmission over the Internet is 
                100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience 
                and analyze website traffic. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not 
                knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                significant changes by posting the new policy on this page and updating the 
                "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> info@phildass.com<br />
                <strong>Website:</strong> MediaCareers.in
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600">
              <p>Last Updated: November 2024</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
