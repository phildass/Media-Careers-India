import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-primary-lavender-dark to-accent-red text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:opacity-80 transition">
              MediaCareers.in
            </Link>
            <div className="flex gap-6">
              <Link href="/jobs" className="hover:opacity-80 transition">
                Jobs
              </Link>
              <Link href="/membership" className="hover:opacity-80 transition">
                Membership
              </Link>
              <Link href="/privacy" className="hover:opacity-80 transition">
                Privacy
              </Link>
              <Link href="/admin/login" className="hover:opacity-80 transition">
                Admin
              </Link>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} MediaCareers.in - Empowering Media Careers Across India</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="text-sm hover:text-primary-lavender transition">
              Privacy Policy
            </Link>
            <Link href="/membership" className="text-sm hover:text-primary-lavender transition">
              Membership
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
