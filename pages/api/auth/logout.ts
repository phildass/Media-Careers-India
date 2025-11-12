import type { NextApiRequest, NextApiResponse } from 'next'
import { removeAuthCookie, getAuthCookie, deleteSession } from '@/lib/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Get the session token and delete it from the session store
  const token = getAuthCookie(req)
  if (token && token !== 'authenticated') {
    deleteSession(token)
  }
  
  removeAuthCookie(res)
  return res.status(200).json({ message: 'Logout successful' })
}
