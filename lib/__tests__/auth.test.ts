import { serialize, parse } from 'cookie'
import { setAuthCookie, removeAuthCookie, getAuthCookie, validateAdmin, isAuthenticated } from '../auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage } from 'http'

describe('Auth Module', () => {
  describe('setAuthCookie', () => {
    it('should set cookie with correct attributes', () => {
      const mockRes = {
        setHeader: jest.fn(),
      } as unknown as NextApiResponse

      setAuthCookie(mockRes, 'authenticated')

      expect(mockRes.setHeader).toHaveBeenCalledTimes(1)
      expect(mockRes.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.any(String))

      const setCookieValue = (mockRes.setHeader as jest.Mock).mock.calls[0][1] as string
      const parsedCookie = parse(setCookieValue.split(';')[0])
      
      expect(parsedCookie.admin_session).toBe('authenticated')
      expect(setCookieValue).toContain('Max-Age=28800')
      expect(setCookieValue).toContain('HttpOnly')
      expect(setCookieValue).toContain('Path=/')
      expect(setCookieValue).toContain('SameSite=Lax')
    })

    it('should set secure flag in production', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      const mockRes = {
        setHeader: jest.fn(),
      } as unknown as NextApiResponse

      setAuthCookie(mockRes, 'authenticated')

      const setCookieValue = (mockRes.setHeader as jest.Mock).mock.calls[0][1] as string
      expect(setCookieValue).toContain('Secure')

      process.env.NODE_ENV = originalEnv
    })
  })

  describe('removeAuthCookie', () => {
    it('should remove cookie by setting maxAge to -1 and expires to epoch', () => {
      const mockRes = {
        setHeader: jest.fn(),
      } as unknown as NextApiResponse

      removeAuthCookie(mockRes)

      expect(mockRes.setHeader).toHaveBeenCalledTimes(1)
      const setCookieValue = (mockRes.setHeader as jest.Mock).mock.calls[0][1] as string
      
      expect(setCookieValue).toContain('admin_session=')
      expect(setCookieValue).toContain('Max-Age=-1')
      expect(setCookieValue).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT')
      expect(setCookieValue).toContain('Path=/')
    })
  })

  describe('getAuthCookie', () => {
    it('should parse cookie from NextApiRequest', () => {
      const mockReq = {
        headers: {
          cookie: 'admin_session=authenticated; other=value',
        },
      } as NextApiRequest

      const result = getAuthCookie(mockReq)
      expect(result).toBe('authenticated')
    })

    it('should parse cookie from IncomingMessage', () => {
      const mockReq = {
        headers: {
          cookie: 'admin_session=authenticated',
        },
      } as IncomingMessage

      const result = getAuthCookie(mockReq)
      expect(result).toBe('authenticated')
    })

    it('should return undefined if cookie not present', () => {
      const mockReq = {
        headers: {
          cookie: 'other=value',
        },
      } as NextApiRequest

      const result = getAuthCookie(mockReq)
      expect(result).toBeUndefined()
    })

    it('should handle missing cookie header', () => {
      const mockReq = {
        headers: {},
      } as NextApiRequest

      const result = getAuthCookie(mockReq)
      expect(result).toBeUndefined()
    })
  })

  describe('validateAdmin', () => {
    it('should validate with environment variables', () => {
      const originalUser = process.env.ADMIN_USER
      const originalPass = process.env.ADMIN_PASS
      
      process.env.ADMIN_USER = 'testuser'
      process.env.ADMIN_PASS = 'testpass'

      expect(validateAdmin('testuser', 'testpass')).toBe(true)
      expect(validateAdmin('wrong', 'testpass')).toBe(false)
      expect(validateAdmin('testuser', 'wrong')).toBe(false)

      process.env.ADMIN_USER = originalUser
      process.env.ADMIN_PASS = originalPass
    })

    it('should use default credentials if env vars not set', () => {
      const originalUser = process.env.ADMIN_USER
      const originalPass = process.env.ADMIN_PASS
      
      delete process.env.ADMIN_USER
      delete process.env.ADMIN_PASS

      expect(validateAdmin('admin', 'changeme')).toBe(true)
      expect(validateAdmin('wrong', 'changeme')).toBe(false)

      process.env.ADMIN_USER = originalUser
      process.env.ADMIN_PASS = originalPass
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when cookie is authenticated', () => {
      const mockReq = {
        headers: {
          cookie: 'admin_session=authenticated',
        },
      } as NextApiRequest

      expect(isAuthenticated(mockReq)).toBe(true)
    })

    it('should return false when cookie has different value', () => {
      const mockReq = {
        headers: {
          cookie: 'admin_session=wrongvalue',
        },
      } as NextApiRequest

      expect(isAuthenticated(mockReq)).toBe(false)
    })

    it('should return false when cookie is not present', () => {
      const mockReq = {
        headers: {},
      } as NextApiRequest

      expect(isAuthenticated(mockReq)).toBe(false)
    })
  })
})
