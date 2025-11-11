import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-lavender-600">
              MediaCareers.in
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/jobs"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === '/jobs'
                  ? 'text-lavender-600'
                  : 'text-gray-700 hover:text-lavender-600'
              }`}
            >
              Jobs
            </Link>
            <Link
              href="/membership"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === '/membership'
                  ? 'text-lavender-600'
                  : 'text-gray-700 hover:text-lavender-600'
              }`}
            >
              Membership
            </Link>
            <Link
              href="/privacy"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === '/privacy'
                  ? 'text-lavender-600'
                  : 'text-gray-700 hover:text-lavender-600'
              }`}
            >
              Privacy
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
