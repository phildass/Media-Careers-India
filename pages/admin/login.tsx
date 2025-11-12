import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // keep same-origin so browser will store cookie from same origin
        credentials: 'same-origin',
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        let data: any = null
        try { data = await response.json() } catch {}
        setError((data && data.message) || 'Invalid password')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lavender to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">MediaCareers.in</p>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-lavender-dark"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-red text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent-red-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-accent-red hover:underline text-sm">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
