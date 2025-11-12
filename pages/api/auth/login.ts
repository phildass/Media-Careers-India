import type { NextApiRequest, NextApiResponse } from 'next'
import { setAuthCookie } from '../../../lib/auth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  try {
    const { password } = req.body || {}

    // Use environment variable if present; fallback to the literal requested password
    const ACCEPTED = process.env.ADMIN_PASS || process.env.SIMPLE_ADMIN_PASS || 'mediaci123'

    if (!password || password !== ACCEPTED) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    // set a simple authenticated cookie
    setAuthCookie(res, 'authenticated')

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Login handler error', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
