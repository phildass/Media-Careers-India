# Testing Guide for MediaCareers.in MVP

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Initialize database:**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Visit http://localhost:3000

## Manual Testing Checklist

### Public Pages

- [ ] **Landing Page (/):**
  - Loads with lavender/red/black branding
  - "Browse Jobs" and "Get Premium Membership" CTAs work
  - Navigation menu links work
  - Responsive on mobile

- [ ] **Jobs Listing (/jobs):**
  - Page loads (shows empty state or jobs if seeded)
  - Search filters are visible
  - Job cards are clickable

- [ ] **Job Details (/jobs/[id]):**
  - Shows "Job Not Found" for invalid IDs
  - "Apply Now" button shows application form
  - Form accepts name, email, phone, resume, cover letter
  - Form submission works (check console for email log)

- [ ] **Membership Page (/membership):**
  - Premium pricing displayed (₹199 for 3 months)
  - UPI payment instructions shown
  - Free membership eligibility explained

- [ ] **Privacy Policy (/privacy):**
  - All sections load properly
  - Contact information displayed

### Admin Area

- [ ] **Admin Login (/admin/login):**
  - Shows login form
  - Invalid credentials show error
  - Valid credentials redirect to dashboard
  - Credentials from .env work (ADMIN_USER/ADMIN_PASS)
  - Works with both plain text and bcrypt hashed passwords

- [ ] **Admin Dashboard (/admin):**
  - Redirects to login if not authenticated
  - Shows placeholder job management interface
  - Shows placeholder application management
  - "View Site" and "Logout" buttons work
  
- [ ] **Password Hashing:**
  - Generate hash: `node scripts/hash-password.js testpassword`
  - Update ADMIN_PASS in .env with the hash
  - Restart server and login with original password
  - Should work seamlessly

- [ ] **Session Management:**
  - Login persists across page refreshes
  - Logout clears session
  - Session expires after 8 hours
  - Cannot access admin without valid session

### API Endpoints

- [ ] **POST /api/auth/login:**
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"changeme"}'
  ```
  Expected: `{"message":"Login successful"}`

- [ ] **POST /api/auth/logout:**
  ```bash
  curl -X POST http://localhost:3000/api/auth/logout
  ```
  Expected: `{"message":"Logout successful"}`

- [ ] **POST /api/apply:**
  - Test via job details page form submission
  - Check console for email log
  - Check database for application record

- [ ] **GET /api/scrape:**
  ```bash
  curl http://localhost:3000/api/scrape
  ```
  Expected: 401 Unauthorized (requires admin auth)

- [ ] **POST /api/ai/parse-resume:**
  ```bash
  curl -X POST http://localhost:3000/api/ai/parse-resume \
    -H "Content-Type: application/json" \
    -d '{"resumeText":"Sample resume"}'
  ```
  Expected: Mock response with placeholder data

- [ ] **POST /api/ai/generate-cover-letter:**
  ```bash
  curl -X POST http://localhost:3000/api/ai/generate-cover-letter \
    -H "Content-Type: application/json" \
    -d '{"jobDescription":"Content Writer","candidateName":"Test User"}'
  ```
  Expected: Mock cover letter

## Database Testing

### View Database
```bash
npm run prisma:studio
```

### Add Sample Data

Open Prisma Studio and add:

1. **Company:**
   - Name: "Test Media Company"
   - Website: "https://example.com"
   - Description: "A leading media company"
   - Location: "Mumbai"

2. **Job:**
   - Title: "Content Writer"
   - Description: "Write engaging content..."
   - Location: "Mumbai"
   - Salary: "₹30,000 - ₹50,000"
   - Job Type: "full-time"
   - Experience: "1-3 years"
   - Skills: "Writing, SEO, Social Media"
   - Company: (select the one you created)
   - Is Active: true

3. **Test the jobs listing page** - should now show the job

## Email Testing

### Development (No SMTP)
- Leave SMTP variables empty in .env
- Submit a job application
- Check console logs for email content

### Production (With SMTP)
- Configure SMTP settings in .env
- Submit a job application
- Check info@phildass.com for email

## Security Testing

### Vulnerabilities Check
```bash
npm audit
```

### CodeQL Analysis
Already passed - no security alerts

### Authentication
- Try accessing /admin without login → should redirect to login
- Try accessing API endpoints without auth → should get 401

## Performance Testing

### Build Check
```bash
npm run build
```
Expected: Successful build with no errors

### Lint Check
```bash
npm run lint
```
Expected: No ESLint warnings or errors

## Known Limitations (MVP)

1. **Admin CRUD:** Jobs can only be added via Prisma Studio
2. **File Upload:** Resumes saved locally (not cloud storage)
3. **Email:** Uses console logging in dev mode
4. **AI Features:** Placeholder endpoints only
5. **Scraping:** Not implemented yet
6. **Payment:** UPI QR code upload not implemented
7. **User Accounts:** No member registration system yet
8. **Search:** Job filters not functional

## Next Steps After MVP

1. Implement full admin CRUD for jobs
2. Add OpenAI integration for resume parsing
3. Implement job scraping worker
4. Add UPI payment QR upload
5. Create member account system
6. Implement job search and filtering
7. Add email templates and SMTP configuration
8. Deploy to production (Vercel recommended)

## Troubleshooting

### Build Fails
- Run `npm install` again
- Check Node.js version (need 18+)
- Clear `.next` folder and rebuild

### Database Issues
- Delete `prisma/dev.db` and re-run migrations
- Check DATABASE_URL in .env

### Port Already in Use
- Change port: `PORT=3001 npm run dev`
- Or kill process using port 3000

### Prisma Issues
- Run `npm run prisma:generate`
- Check schema syntax
