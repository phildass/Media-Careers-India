import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-lavender-400 mb-4">MediaCareers.in</h3>
            <p className="text-gray-400">
              Connecting media professionals with opportunities across India
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-lavender-400">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-400 hover:text-lavender-400">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-lavender-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">info@phildass.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MediaCareers.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
