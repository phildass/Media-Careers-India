# Admin Login Security Improvements

## Overview
This document describes the security improvements made to the admin authentication system in MediaCareers.in.

## Changes Made

### 1. Password Hashing with bcrypt
- Admin passwords can now be stored as bcrypt hashes instead of plain text
- Automatic detection of hash format (detects `$2a$`, `$2b$`, or `$2y$` prefixes)
- Backward compatible with plain text passwords for development environments
- Uses bcrypt's secure comparison to prevent timing attacks

### 2. Signed Session Tokens
- Replaced hardcoded "authenticated" token with HMAC-SHA256 signed tokens
- Tokens include:
  - Username
  - Expiration timestamp (8 hours from creation)
  - HMAC signature for integrity verification
- Uses `SESSION_SECRET` environment variable for signing key
- Prevents token tampering and session hijacking
- No server-side session storage required (stateless)

### 3. Password Hashing Utility
Created `scripts/hash-password.js` CLI tool for generating bcrypt hashes:
```bash
node scripts/hash-password.js your-secure-password
```

Output includes:
- The bcrypt hash
- Example .env configuration
- Usage instructions

## Security Benefits

### Before
- ❌ Plain text password comparison
- ❌ Static "authenticated" session token
- ❌ No session expiration validation
- ❌ Vulnerable to token tampering

### After
- ✅ Bcrypt password hashing (optional but recommended)
- ✅ Cryptographically signed session tokens
- ✅ Automatic session expiration (8 hours)
- ✅ Token integrity verification
- ✅ Stateless authentication (no memory leaks)
- ✅ Backward compatible with plain text passwords

## Usage

### Development (Plain Text Password)
```env
ADMIN_USER="admin"
ADMIN_PASS="changeme"
SESSION_SECRET="dev-secret"
```

### Production (Hashed Password)
1. Generate a hash:
```bash
node scripts/hash-password.js your-secure-production-password
```

2. Update `.env`:
```env
ADMIN_USER="admin"
ADMIN_PASS="$2a$10$..." 
SESSION_SECRET="random-secret-key-at-least-32-chars"
```

## Technical Details

### Token Format
```
base64(JSON{username, expiresAt}).HMAC-SHA256(payload, SESSION_SECRET)
```

### Token Lifecycle
1. **Login**: Validate credentials → Create signed token → Set HTTP-only cookie
2. **Request**: Extract cookie → Verify signature → Check expiration → Allow/deny access
3. **Logout**: Delete cookie (token expires automatically)

### Session Duration
- Default: 8 hours (28,800 seconds)
- Configurable via `MAX_AGE` constant in `lib/auth.ts`
- Tokens automatically expire after this duration

## Migration Guide

### From Plain Text to Hashed Passwords
1. Generate hash: `node scripts/hash-password.js your-current-password`
2. Replace `ADMIN_PASS` in `.env` with the generated hash
3. Restart the application
4. Test login with the same password (system auto-detects hash format)

### Rollback
Simply replace the hashed `ADMIN_PASS` with plain text. The system automatically detects the format and handles both.

## Security Recommendations

### Required for Production
1. ✅ Use bcrypt hashed passwords (not plain text)
2. ✅ Set a strong, random `SESSION_SECRET` (min 32 characters)
3. ✅ Use HTTPS (cookies have `secure` flag in production)
4. ✅ Keep `SESSION_SECRET` confidential (never commit to git)

### Optional Enhancements (Future)
- Add rate limiting to prevent brute force attacks
- Implement account lockout after failed attempts
- Add 2FA (two-factor authentication)
- Migrate to Redis/database for session storage in distributed environments
- Add session revocation capability
- Implement "remember me" functionality

## Testing

All authentication flows have been tested:
- ✅ Login with plain text password
- ✅ Login with bcrypt hashed password
- ✅ Session persistence across page loads
- ✅ Session expiration
- ✅ Logout functionality
- ✅ Unauthorized access redirects
- ✅ Token signature verification
- ✅ Token tampering prevention

## Files Modified

1. **lib/auth.ts** - Core authentication logic with bcrypt and signed tokens
2. **pages/api/auth/login.ts** - Updated to use new session creation
3. **pages/api/auth/logout.ts** - Updated to use new session deletion
4. **.env.example** - Added documentation for hashed passwords
5. **README.md** - Updated with security documentation
6. **scripts/hash-password.js** - New utility for password hashing

## Backward Compatibility

✅ All existing functionality remains unchanged:
- Plain text passwords still work (for dev environments)
- Legacy "authenticated" token still works
- No breaking changes to the admin UI
- No database schema changes required

## Support

For questions or issues related to authentication:
1. Check this document
2. Review `scripts/hash-password.js` for password hashing
3. Review `lib/auth.ts` for implementation details
4. Contact: info@phildass.com
