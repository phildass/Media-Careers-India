# MediaCareers.in

A full-stack Next.js web application connecting media professionals with career opportunities across India. Built with TypeScript, Tailwind CSS, and Prisma.

## 🚀 Features

- **Public Job Listings**: Browse and search media career opportunities
- **Job Applications**: Apply directly with resume uploads and cover letters
- **Admin Dashboard**: Manage job postings and review applications
- **Email Notifications**: Automated application notifications (configurable SMTP)
- **Premium Membership**: Subscribe for exclusive benefits and features
- **AI Integration (Planned)**: Resume parsing and cover letter generation
- **Job Scraping (Planned)**: Automated job discovery from multiple sources

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (TypeScript)
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: Iron Session (cookie-based)
- **Email**: Nodemailer
- **File Uploads**: Formidable

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🏁 Getting Started

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

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Database
DATABASE_URL="file:./dev.db"

# Admin credentials (change these!)
ADMIN_USER="admin"
ADMIN_PASS="your-secure-password"

# SMTP Settings (optional - logs to console if not configured)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@mediacareers.in"

# Application email recipient
APPLICATION_EMAIL="info@phildass.com"

# Session secret (generate a random string)
SESSION_SECRET="generate-a-random-32-character-string-here"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Initialize the database

```bash
npm run prisma:migrate
```

This will:
- Create the SQLite database
- Run migrations to set up tables
- Generate Prisma Client

### 5. (Optional) Seed the database

You can manually add test data through the admin dashboard, or create a seed script.

### 6. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
Media-Careers-India/
├── components/         # React components (Layout, Header, Footer)
├── lib/               # Utility functions (auth, database, email)
├── pages/             # Next.js pages and API routes
│   ├── api/           # API endpoints
│   │   ├── auth/      # Authentication endpoints
│   │   ├── ai/        # AI placeholders (resume parsing, cover letters)
│   │   ├── apply.ts   # Job application endpoint
│   │   └── scrape.ts  # Scraping placeholder
│   ├── admin/         # Admin dashboard
│   ├── jobs/          # Job listings and details
│   ├── index.tsx      # Landing page
│   ├── membership.tsx # Membership information
│   └── privacy.tsx    # Privacy policy
├── prisma/            # Database schema and migrations
├── public/            # Static files and uploads
├── styles/            # Global CSS styles
└── .env.example       # Environment variables template
```

## 🔑 Admin Access

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Use credentials from your `.env` file (default: admin/changeme123)
3. Access the dashboard to manage jobs and view applications

## 📧 Email Configuration

### Development Mode (Default)
If SMTP is not configured, emails are logged to the console instead of being sent.

### Production Mode
Configure SMTP settings in `.env`:
- For Gmail: Use App Passwords (not your regular password)
- For other providers: Use their SMTP settings

## 🔐 Security Notes

- **Never commit `.env` file** - it contains sensitive credentials
- **Change default admin password** before deployment
- **Use environment variables** for all secrets
- Session cookies are HTTP-only and secure in production
- File uploads are stored in `public/uploads/` (add size limits as needed)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## 🧪 Testing

Manual testing instructions:

1. **Landing Page**: Visit `/` and verify branding/CTAs
2. **Job Listings**: Check `/jobs` for job list
3. **Job Application**: Apply to a job and verify email/database
4. **Admin Login**: Test authentication at `/admin/login`
5. **Admin Dashboard**: View jobs and applications

## 🔮 Planned Features

- [ ] AI-powered resume parsing (OpenAI integration)
- [ ] AI cover letter generation
- [ ] Automated job scraping from multiple sources
- [ ] UPI payment integration for membership
- [ ] User profiles and saved jobs
- [ ] Advanced job search and filters
- [ ] Email newsletters
- [ ] Mobile app

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 📧 Contact

For questions or support, contact: info@phildass.com

---

Built with ❤️ for the Indian media community
