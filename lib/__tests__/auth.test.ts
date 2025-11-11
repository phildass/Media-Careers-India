import { serialize, parse } from 'cookie'
import {
  setAuthCookie,
  removeAuthCookie,
  getAuthCookie,
  validateAdmin,
  isAuthenticated,
} from '../auth'

// Mock Next.js types
interface MockResponse {
  setHeader: jest.Mock
}

interface MockRequest {
  headers: {
    cookie?: string
  }
}

describe('lib/auth', () => {
  describe('setAuthCookie', () => {
    it('should set an authentication cookie with correct options', () => {
      const mockRes = {
        setHeader: jest.fn(),
      } as unknown as MockResponse

      setAuthCookie(mockRes as any, 'test-token')

      expect(mockRes.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.stringContaining('admin_session=test-token')
      )

      const cookieString = mockRes.setHeader.mock.calls[0][1]
      expect(cookieString).toContain('HttpOnly')
      expect(cookieString).toContain('SameSite=Lax')
      expect(cookieString).toContain('Path=/')
      expect(cookieString).toContain('Max-Age=28800') // 8 hours in seconds
    })

    it('should set secure flag in production', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      const mockRes = {
        setHeader: jest.fn(),
      } as unknown as MockResponse

      setAuthCookie(mockRes as any, 'test-token')

      const cookieString = mockRes.setHeader.mock.calls[0][1]
      expect(cookieString).toContain('Secure')

      process.env.NODE_ENV = originalEnv
    })

    it('should not set secure flag in development', () => {
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'

      const mockRes = {
        setHeader: jest.fn(),
      } as unknown as MockResponse

      setAuthCookie(mockRes as any, 'test-token')

      const cookieString = mockRes.setHeader.mock.calls[0][1]
      expect(cookieString).not.toContain('Secure')

      process.env.NODE_ENV = originalEnv
    })
  })

  describe('removeAuthCookie', () => {
    it('should remove the authentication cookie with maxAge 0', () => {
      const mockRes = {
        setHeader: jest.fn(),
      } as unknown as MockResponse

      removeAuthCookie(mockRes as any)

      expect(mockRes.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.stringContaining('admin_session=')
      )

      const cookieString = mockRes.setHeader.mock.calls[0][1]
      expect(cookieString).toContain('Max-Age=0')
      expect(cookieString).toContain('Path=/')
    })
  })

  describe('getAuthCookie', () => {
    it('should return the token value when cookie is present', () => {
      const mockReq = {
        headers: {
          cookie: 'admin_session=test-token; other=value',
        },
      } as MockRequest

      const result = getAuthCookie(mockReq as any)

      expect(result).toBe('test-token')
    })

    it('should return undefined when cookie is not present', () => {
      const mockReq = {
        headers: {
          cookie: 'other=value',
        },
      } as MockRequest

      const result = getAuthCookie(mockReq as any)

      expect(result).toBeUndefined()
    })

    it('should return undefined when no cookies are present', () => {
      const mockReq = {
        headers: {},
      } as MockRequest

      const result = getAuthCookie(mockReq as any)

      expect(result).toBeUndefined()
    })
  })

  describe('validateAdmin', () => {
    it('should return true for correct credentials with default values', () => {
      const originalUser = process.env.ADMIN_USER
      const originalPass = process.env.ADMIN_PASS
      delete process.env.ADMIN_USER
      delete process.env.ADMIN_PASS

      const result = validateAdmin('admin', 'changeme')

      expect(result).toBe(true)

      process.env.ADMIN_USER = originalUser
      process.env.ADMIN_PASS = originalPass
    })

    it('should return false for incorrect credentials', () => {
      const result = validateAdmin('wrong', 'credentials')

      expect(result).toBe(false)
    })

    it('should return true for correct credentials from environment variables', () => {
      const originalUser = process.env.ADMIN_USER
      const originalPass = process.env.ADMIN_PASS
      process.env.ADMIN_USER = 'testuser'
      process.env.ADMIN_PASS = 'testpass'

      const result = validateAdmin('testuser', 'testpass')

      expect(result).toBe(true)

      process.env.ADMIN_USER = originalUser
      process.env.ADMIN_PASS = originalPass
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when valid cookie is present', () => {
      const mockReq = {
        headers: {
          cookie: 'admin_session=authenticated',
        },
      } as MockRequest

      const result = isAuthenticated(mockReq as any)

      expect(result).toBe(true)
    })

    it('should return false when cookie is not present', () => {
      const mockReq = {
        headers: {},
      } as MockRequest

      const result = isAuthenticated(mockReq as any)

      expect(result).toBe(false)
    })

    it('should return true for any non-empty token value', () => {
      const mockReq = {
        headers: {
          cookie: 'admin_session=any-value',
        },
      } as MockRequest

      const result = isAuthenticated(mockReq as any)

      expect(result).toBe(true)
    })
  })
})
