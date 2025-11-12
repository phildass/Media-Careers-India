# MediaCareers.in - Your Gateway to Media Jobs in India

A full-stack Next.js web application connecting media professionals with opportunities across journalism, broadcasting, digital media, PR, and content creation in India.

## 🚀 Features

- **Public Job Listings**: Browse curated media job opportunities
- **Job Applications**: Apply directly with resume upload
- **Admin Dashboard**: Manage jobs and applications
- **Premium Membership**: ₹199 for 3 months with exclusive benefits
- **AI Integration (Planned)**: Resume parsing and cover letter generation
- **Email Notifications**: Automated application notifications
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **File Upload**: Formidable
- **Email**: Nodemailer
- **Authentication**: Cookie-based session (simple admin auth)

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/phildass/Media-Careers-India.git
cd Media-Careers-India
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# Database
DATABASE_URL="file:./dev.db"

# Admin Authentication
ADMIN_USER="admin"
ADMIN_PASS="your-secure-password"
# For production, use a hashed password (recommended):
# Run: node scripts/hash-password.js yourpassword
# Then use the hash: ADMIN_PASS="$2a$10$..."

# SMTP Configuration (optional - will log to console if not set)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Application Email
APP_EMAIL="info@phildass.com"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Session Secret
SESSION_SECRET="change-this-to-a-random-secret-in-production"
```

### 4. Initialize the database

```bash
npm run prisma:migrate
npm run prisma:generate
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## 🗂️ Project Structure

```
├── pages/
│   ├── index.tsx              # Landing page
│   ├── jobs/
│   │   ├── index.tsx          # Jobs listing
│   │   └── [id].tsx           # Job details & application
│   ├── admin/
│   │   ├── login.tsx          # Admin login
│   │   └── index.tsx          # Admin dashboard
│   ├── membership.tsx         # Premium membership info
│   ├── privacy.tsx            # Privacy policy
│   └── api/
│       ├── auth/              # Authentication endpoints
│       ├── apply.ts           # Job application endpoint
│       ├── scrape.ts          # Scraping placeholder
│       └── ai/                # AI endpoints (placeholders)
├── components/
│   └── Layout.tsx             # Main layout component
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # Authentication utilities
│   └── email.ts               # Email utilities
├── prisma/
│   └── schema.prisma          # Database schema
└── styles/
    └── globals.css            # Global styles
```

## 🔐 Admin Access

### Login

1. Navigate to `/admin/login`
2. Use credentials from your `.env` file:
   - Username: Value of `ADMIN_USER`
   - Password: Value of `ADMIN_PASS` (can be plain text or bcrypt hash)

### Security Features

The admin authentication system includes:

- **Secure session management**: Random session tokens with automatic expiration
- **Password hashing support**: Use bcrypt hashed passwords for production
- **Backward compatibility**: Plain text passwords still work for development
- **HTTP-only cookies**: Session cookies cannot be accessed via JavaScript
- **Automatic session cleanup**: Expired sessions are automatically removed

### Generate Secure Password Hash

For production, generate a bcrypt hash of your password:

```bash
node scripts/hash-password.js your-secure-password
```

Then update your `.env` file with the generated hash:

```env
ADMIN_PASS="$2a$10$abc123..."
```

The system will automatically detect and use bcrypt comparison for hashed passwords.

## 📧 Email Configuration

### Development (No SMTP)
Leave SMTP variables empty in `.env` - emails will be logged to console

### Production (With SMTP)
Configure SMTP settings in `.env`:
- For Gmail: Use App Passwords (not your regular password)
- For other providers: Use their SMTP settings

## 🗄️ Database Management

### View/Edit Data
```bash
npm run prisma:studio
```

### Reset Database
```bash
rm prisma/dev.db
npm run prisma:migrate
```

### Add Seed Data (Optional)
Create `prisma/seed.ts` with sample jobs and companies, then run:
```bash
npx tsx prisma/seed.ts
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Landing page loads with proper branding
- [ ] Jobs listing page displays (empty or with data)
- [ ] Job details page loads
- [ ] Job application form submits successfully
- [ ] Admin login works with correct credentials
- [ ] Admin dashboard is protected (requires login)
- [ ] Membership and Privacy pages load
- [ ] Email notifications (check console in dev mode)

## 🔮 Planned Features (TODO)

### High Priority
- [ ] Full admin CRUD for jobs and companies
- [ ] Application status management
- [ ] Resume file viewer in admin panel
- [ ] UPI payment QR code upload
- [ ] Member account system

### AI Integration
- [ ] OpenAI integration for resume parsing
- [ ] Cover letter generation
- [ ] Automatic eligibility detection for free membership

### Automation
- [ ] Job scraping from media company websites
- [ ] Scheduled email digests
- [ ] Automatic job expiry handling

### Enhanced Features
- [ ] Job search and filtering
- [ ] Saved jobs for users
- [ ] Application tracking for candidates
- [ ] Company profiles
- [ ] Analytics dashboard

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 📞 Support

For questions or support, contact: info@phildass.com

## 🎨 Branding

- Primary: Lavender (#E6E6FA, #9370DB)
- Accent: Red (#DC143C, #B22222)
- Neutral: Black, White, Grays

---

**Note**: This is an MVP scaffold. Many features are placeholders and require full implementation. Refer to TODO comments in the code for specific areas needing development.
