import { serialize, parse } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage } from 'http'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const TOKEN_NAME = 'admin_session'
const MAX_AGE = 60 * 60 * 8 // 8 hours

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

function createSignedToken(username: string): string {
  const sessionSecret = process.env.SESSION_SECRET || 'default-dev-secret-change-in-production'
  const expiresAt = Date.now() + MAX_AGE * 1000
  const payload = JSON.stringify({ username, expiresAt })
  
  // Create a simple signature using HMAC
  const hmac = crypto.createHmac('sha256', sessionSecret)
  hmac.update(payload)
  const signature = hmac.digest('hex')
  
  // Combine payload and signature
  const token = Buffer.from(payload).toString('base64') + '.' + signature
  return token
}

function verifySignedToken(token: string): { username: string; expiresAt: number } | null {
  try {
    const [payloadB64, signature] = token.split('.')
    if (!payloadB64 || !signature) {
      return null
    }
    
    const payload = Buffer.from(payloadB64, 'base64').toString('utf-8')
    
    // Verify signature
    const sessionSecret = process.env.SESSION_SECRET || 'default-dev-secret-change-in-production'
    const hmac = crypto.createHmac('sha256', sessionSecret)
    hmac.update(payload)
    const expectedSignature = hmac.digest('hex')
    
    if (signature !== expectedSignature) {
      return null
    }
    
    // Parse and validate payload
    const data = JSON.parse(payload)
    
    // Check expiration
    if (data.expiresAt < Date.now()) {
      return null
    }
    
    return data
  } catch (error) {
    return null
  }
}

export function setAuthCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function removeAuthCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function getAuthCookie(req: NextApiRequest | IncomingMessage): string | undefined {
  const cookies = parse(req.headers.cookie || '')
  return cookies[TOKEN_NAME]
}

export async function validateAdmin(username: string, password: string): Promise<boolean> {
  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASS || 'changeme'
  
  // Check username first
  if (username !== adminUser) {
    return false
  }
  
  // Check if ADMIN_PASS is already a bcrypt hash (starts with $2a$, $2b$, or $2y$)
  if (adminPass.startsWith('$2a$') || adminPass.startsWith('$2b$') || adminPass.startsWith('$2y$')) {
    // It's a hash, use bcrypt compare
    return await bcrypt.compare(password, adminPass)
  } else {
    // It's plain text (for backward compatibility), do direct comparison
    // In production, this should be a hashed password
    return password === adminPass
  }
}

export function createSession(username: string): string {
  return createSignedToken(username)
}

export function deleteSession(token: string): void {
  // With signed tokens, we don't need to track sessions server-side
  // The token is removed client-side by removing the cookie
}

export function isAuthenticated(req: NextApiRequest | IncomingMessage): boolean {
  const token = getAuthCookie(req)
  if (!token) {
    return false
  }
  
  // Check for legacy "authenticated" token for backward compatibility
  if (token === 'authenticated') {
    return true
  }
  
  // Verify the signed token
  const session = verifySignedToken(token)
  return session !== null
}
