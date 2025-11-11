import Layout from '@/components/Layout'

export default function PrivacyPage() {
  return (
    <Layout title="Privacy Policy" description="Privacy policy for MediaCareers.in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        
        <div className="prose max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Introduction</h2>
            <p>
              MediaCareers.in (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Personal Information</h3>
            <p>We may collect personal information that you provide to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Resume and professional information</li>
              <li>Application materials and cover letters</li>
              <li>Payment information for membership subscriptions</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process job applications and connect you with employers</li>
              <li>Manage membership subscriptions and payments</li>
              <li>Send notifications about job opportunities and updates</li>
              <li>Improve our website and services</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Analyze usage patterns and optimize user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Employers and companies when you apply for jobs through our platform</li>
              <li>Service providers who assist in operating our website and services</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
            <p className="mt-4">
              We do not sell, trade, or rent your personal information to third parties for 
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or 
              destruction. However, no method of transmission over the Internet is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Resume Parsing and AI</h2>
            <p>
              We may use automated systems and AI technology to parse resumes and match 
              candidates with job opportunities. This helps us provide better recommendations 
              and streamline the application process. Your resume data is used solely for this 
              purpose and is handled with strict confidentiality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing 
              experience, analyze website traffic, and understand where our visitors are coming 
              from. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not 
              knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the &quot;Last Updated&quot; 
              date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> info@phildass.com
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500">
              Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
