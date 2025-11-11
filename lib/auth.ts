import { serialize, parse } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage } from 'http'

// Authentication cookie configuration
const TOKEN_NAME = 'admin_session'
const MAX_AGE = 60 * 60 * 8 // 8 hours in seconds

/**
 * Sets an authentication cookie on the response
 * @param res - Next.js API response object
 * @param token - Authentication token value to store in cookie
 */
export function setAuthCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  })

  res.setHeader('Set-Cookie', cookie)
}

/**
 * Removes the authentication cookie by setting it to expire immediately
 * @param res - Next.js API response object
 */
export function removeAuthCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: 0,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

/**
 * Retrieves the authentication cookie from the request
 * @param req - Next.js API request or IncomingMessage object
 * @returns The token value if present, undefined otherwise
 */
export function getAuthCookie(req: NextApiRequest | IncomingMessage): string | undefined {
  const cookies = parse(req.headers.cookie || '')
  return cookies[TOKEN_NAME]
}

/**
 * Validates admin credentials against environment variables
 * @param username - Username to validate
 * @param password - Password to validate
 * @returns true if credentials match, false otherwise
 */
export function validateAdmin(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASS || 'changeme'
  
  return username === adminUser && password === adminPass
}

/**
 * Checks if a request contains a valid authentication cookie
 * @param req - Next.js API request or IncomingMessage object
 * @returns true if authenticated cookie is present, false otherwise
 */
export function isAuthenticated(req: NextApiRequest | IncomingMessage): boolean {
  const token = getAuthCookie(req)
  return !!token
}

/*
 * Manual Testing Instructions:
 * 
 * 1. Start the development server: npm run dev
 * 
 * 2. Test login and cookie setting:
 *    curl -i -X POST http://localhost:3000/api/auth/login \
 *      -H 'Content-Type: application/json' \
 *      -d '{"username":"admin","password":"changeme"}'
 * 
 *    Expected: Set-Cookie header with admin_session cookie (HttpOnly, SameSite=Lax, Path=/)
 * 
 * 3. Test authenticated access with cookie:
 *    curl -i http://localhost:3000/admin \
 *      -H 'Cookie: admin_session=authenticated'
 * 
 *    Expected: 200 response with admin dashboard HTML
 * 
 * 4. Test logout and cookie removal:
 *    curl -i -X POST http://localhost:3000/api/auth/logout
 * 
 *    Expected: Set-Cookie header with admin_session cookie and Max-Age=0
 */
