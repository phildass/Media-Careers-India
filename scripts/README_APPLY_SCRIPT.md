# Admin Login Security Fix - Installation Script

## Overview

This script automates the application of security enhancements to the admin login system, including:
- Bcrypt password hashing support
- HMAC-signed session tokens
- Secure cookie configuration
- Automatic session expiration

## Prerequisites

- Node.js 18+ installed
- npm installed
- Git repository cloned

## Usage

### Quick Start

From the project root directory:

```bash
bash scripts/apply-admin-login-fix.sh
```

### What the Script Does

The script performs the following steps:

1. **Environment Check** - Verifies Node.js installation and project structure
2. **Dependency Installation** - Runs `npm install` to ensure all packages are installed
3. **Prisma Setup** - Generates Prisma client for database operations
4. **Environment Configuration** - Creates `.env` file if it doesn't exist
5. **Password Hash Generation** - Optionally generates bcrypt hash for admin password
6. **Session Secret Setup** - Optionally generates secure random SESSION_SECRET
7. **Build Verification** - Builds the application to ensure no errors
8. **Lint Check** - Runs ESLint to verify code quality

### Interactive Prompts

The script will ask you:

1. **Generate password hash?** 
   - Recommended for production
   - Enter your desired admin password
   - Script will generate a bcrypt hash
   - Option to automatically update `.env` file

2. **Generate SESSION_SECRET?**
   - Recommended for production
   - Generates a 64-character random hex string
   - Option to automatically update `.env` file

### Manual Execution

You can also run specific steps manually:

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Generate password hash
node scripts/hash-password.js your-password

# Build application
npm run build

# Run linter
npm run lint
```

## Post-Installation

After running the script:

1. **Review `.env` file** - Ensure all variables are set correctly:
   ```env
   ADMIN_USER="admin"
   ADMIN_PASS="$2a$10$..."  # Bcrypt hash (recommended)
   SESSION_SECRET="random-64-char-hex-string"
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Test admin login**:
   - Navigate to `http://localhost:3000/admin/login`
   - Use your configured credentials
   - Verify successful login and dashboard access

4. **Read documentation**:
   - `docs/ADMIN_AUTH_SECURITY.md` - Technical implementation details
   - `README.md` - General project documentation
   - `TESTING.md` - Testing procedures

## Security Recommendations

### For Development
- Plain text passwords are acceptable
- Use simple SESSION_SECRET
- HTTPS not required (cookies don't use secure flag)

### For Production
- ✅ **MUST** use bcrypt hashed passwords
- ✅ **MUST** use strong random SESSION_SECRET (32+ characters)
- ✅ **MUST** enable HTTPS (cookies use secure flag)
- ✅ **MUST** keep SESSION_SECRET confidential

## Troubleshooting

### Script fails with "permission denied"
```bash
chmod +x scripts/apply-admin-login-fix.sh
```

### Node.js not found
Install Node.js 18+ from https://nodejs.org/

### Build fails
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment variables not loading
- Ensure `.env` file exists in project root
- Restart the dev server after changing `.env`
- Variables are loaded automatically by Next.js

## What Gets Modified

The script may modify:
- `.env` - Environment configuration (if you choose to auto-update)
- `node_modules/` - Dependencies installation
- `.next/` - Build output
- `prisma/dev.db` - Database (if migrations run)

The script does NOT modify:
- Source code files
- Git repository
- Existing passwords (unless you choose to update them)

## Support

For issues or questions:
1. Check `docs/ADMIN_AUTH_SECURITY.md` for technical details
2. Review error messages from the script
3. Contact: info@phildass.com

## Notes

- The script uses `set -e` to exit on any error
- All prompts can be skipped (press 'n')
- You can re-run the script safely
- Existing `.env` settings are preserved unless you choose to update them
