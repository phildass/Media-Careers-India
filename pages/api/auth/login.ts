import type { NextApiRequest, NextApiResponse } from 'next'
import { validateAdmin, setAuthCookie, createSession } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    const isValid = await validateAdmin(username, password)
    
    if (isValid) {
      const sessionToken = createSession(username)
      setAuthCookie(res, sessionToken)
      return res.status(200).json({ message: 'Login successful' })
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
