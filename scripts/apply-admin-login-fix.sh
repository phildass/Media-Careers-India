#!/bin/bash

# Admin Login Security Fix Application Script
# This script applies the enhanced security features to the admin login system
# Author: GitHub Copilot
# Date: 2025-11-12

set -e  # Exit on error

echo "=================================================="
echo "MediaCareers.in - Admin Login Security Fix"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: This script must be run from the project root directory"
    exit 1
fi

echo "✅ Project root directory confirmed"
echo ""

# Step 1: Check Node.js version
echo "📋 Step 1: Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "   Node.js version: $NODE_VERSION"

if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    exit 1
fi
echo "✅ Node.js check passed"
echo ""

# Step 2: Install dependencies
echo "📋 Step 2: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 3: Generate Prisma client
echo "📋 Step 3: Generating Prisma client..."
npm run prisma:generate
echo "✅ Prisma client generated"
echo ""

# Step 4: Check if .env file exists
echo "📋 Step 4: Checking environment configuration..."
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please update the following in your .env file:"
    echo "   - ADMIN_USER: Set your admin username"
    echo "   - ADMIN_PASS: Set your admin password (or use a hash - see below)"
    echo "   - SESSION_SECRET: Set a strong random secret (at least 32 characters)"
    echo ""
else
    echo "✅ .env file exists"
fi
echo ""

# Step 5: Offer to generate password hash
echo "📋 Step 5: Password Security Setup"
echo ""
echo "Would you like to generate a bcrypt hash for your admin password? (recommended for production)"
read -p "Generate password hash? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    read -sp "Enter admin password: " ADMIN_PASSWORD
    echo ""
    
    if [ -z "$ADMIN_PASSWORD" ]; then
        echo "⚠️  No password entered. Skipping hash generation."
    else
        echo "Generating bcrypt hash..."
        HASH=$(node scripts/hash-password.js "$ADMIN_PASSWORD" 2>/dev/null | grep '^\$2' || echo "")
        
        if [ -n "$HASH" ]; then
            echo ""
            echo "✅ Password hash generated successfully!"
            echo ""
            echo "Copy this hash to your .env file as ADMIN_PASS:"
            echo "ADMIN_PASS=\"$HASH\""
            echo ""
            
            read -p "Would you like to automatically update .env with this hash? (y/n): " -n 1 -r
            echo ""
            
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                # Escape special characters for sed
                ESCAPED_HASH=$(echo "$HASH" | sed 's/[&/\]/\\&/g')
                
                # Update .env file
                if grep -q "^ADMIN_PASS=" .env; then
                    sed -i.bak "s/^ADMIN_PASS=.*/ADMIN_PASS=\"$ESCAPED_HASH\"/" .env
                    echo "✅ .env file updated with hashed password"
                    rm .env.bak 2>/dev/null || true
                else
                    echo "ADMIN_PASS=\"$HASH\"" >> .env
                    echo "✅ ADMIN_PASS added to .env file"
                fi
            fi
        else
            echo "❌ Failed to generate hash. You can do this manually later with:"
            echo "   node scripts/hash-password.js your-password"
        fi
    fi
else
    echo "⚠️  Skipping password hash generation."
    echo "   You can generate a hash later with: node scripts/hash-password.js your-password"
fi
echo ""

# Step 6: Check SESSION_SECRET
echo "📋 Step 6: Checking SESSION_SECRET..."
if grep -q '^SESSION_SECRET="change-this-to-a-random-secret-in-production"' .env || \
   grep -q '^SESSION_SECRET="dev-secret' .env || \
   ! grep -q '^SESSION_SECRET=' .env; then
    echo "⚠️  WARNING: SESSION_SECRET is not set to a secure value"
    echo ""
    echo "For production, set a strong random secret (at least 32 characters):"
    echo "You can generate one with: openssl rand -hex 32"
    echo ""
    
    read -p "Would you like to generate a random SESSION_SECRET now? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if command -v openssl &> /dev/null; then
            NEW_SECRET=$(openssl rand -hex 32)
            
            if grep -q "^SESSION_SECRET=" .env; then
                sed -i.bak "s/^SESSION_SECRET=.*/SESSION_SECRET=\"$NEW_SECRET\"/" .env
                echo "✅ SESSION_SECRET updated in .env file"
                rm .env.bak 2>/dev/null || true
            else
                echo "SESSION_SECRET=\"$NEW_SECRET\"" >> .env
                echo "✅ SESSION_SECRET added to .env file"
            fi
        else
            echo "⚠️  openssl not found. Please set SESSION_SECRET manually."
        fi
    fi
else
    echo "✅ SESSION_SECRET is configured"
fi
echo ""

# Step 7: Build the application
echo "📋 Step 7: Building the application..."
npm run build
echo "✅ Build completed successfully"
echo ""

# Step 8: Run linter
echo "📋 Step 8: Running linter..."
npm run lint
echo "✅ Linting passed"
echo ""

# Final summary
echo "=================================================="
echo "✅ Admin Login Security Fix Applied Successfully!"
echo "=================================================="
echo ""
echo "📝 Summary of Changes:"
echo "   ✅ Bcrypt password hashing support added"
echo "   ✅ HMAC-signed session tokens implemented"
echo "   ✅ 8-hour automatic session expiration"
echo "   ✅ HTTP-only cookies with secure flags"
echo "   ✅ Backward compatibility maintained"
echo ""
echo "📚 Documentation:"
echo "   - docs/ADMIN_AUTH_SECURITY.md - Technical details"
echo "   - README.md - Quick start guide"
echo "   - TESTING.md - Testing procedures"
echo ""
echo "🔐 Security Checklist:"
echo "   [ ] Verify ADMIN_USER is set in .env"
echo "   [ ] Verify ADMIN_PASS is set (preferably as bcrypt hash)"
echo "   [ ] Verify SESSION_SECRET is a strong random value"
echo "   [ ] Test admin login at http://localhost:3000/admin/login"
echo ""
echo "🚀 Next Steps:"
echo "   1. Review your .env configuration"
echo "   2. Start the dev server: npm run dev"
echo "   3. Test login at: http://localhost:3000/admin/login"
echo "   4. Read docs/ADMIN_AUTH_SECURITY.md for details"
echo ""
echo "For production deployment, ensure:"
echo "   - Use bcrypt hashed password (not plain text)"
echo "   - Set strong SESSION_SECRET (32+ random characters)"
echo "   - Enable HTTPS (cookies use secure flag in production)"
echo ""
echo "=================================================="
echo "Installation complete! 🎉"
echo "=================================================="
