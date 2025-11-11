-- SQLite seed data for testing
-- Insert a test company
INSERT INTO Company (id, name, description, website, createdAt, updatedAt)
VALUES (1, 'The Times of India', 'India''s leading English-language daily newspaper', 'https://timesofindia.indiatimes.com', datetime('now'), datetime('now'));

INSERT INTO Company (id, name, description, website, createdAt, updatedAt)
VALUES (2, 'NDTV', 'New Delhi Television - Indian news media company', 'https://www.ndtv.com', datetime('now'), datetime('now'));

-- Insert test jobs
INSERT INTO Job (id, title, description, location, salary, jobType, experience, skills, companyId, isActive, postedDate, createdAt, updatedAt)
VALUES (
  1,
  'Senior Content Writer',
  'We are looking for an experienced content writer to join our digital team. The ideal candidate should have strong writing skills and experience in journalism or digital media.

Responsibilities:
- Create engaging content for our digital platforms
- Research and write articles on trending topics
- Collaborate with editors and designers
- Meet daily deadlines

Requirements:
- 3-5 years of experience in content writing or journalism
- Excellent command of English
- Strong research skills
- Ability to work under pressure',
  'Mumbai, Maharashtra',
  '₹6-8 LPA',
  'full-time',
  '3-5 years',
  '["Content Writing", "Journalism", "SEO", "Research", "English"]',
  1,
  1,
  datetime('now'),
  datetime('now'),
  datetime('now')
);

INSERT INTO Job (id, title, description, location, salary, jobType, experience, skills, companyId, isActive, postedDate, createdAt, updatedAt)
VALUES (
  2,
  'Video Editor',
  'NDTV is seeking a talented video editor to join our production team.

Responsibilities:
- Edit video content for news broadcasts and digital platforms
- Work closely with reporters and producers
- Ensure high-quality output within tight deadlines
- Manage video archives

Requirements:
- 2-4 years of video editing experience
- Proficiency in Adobe Premiere Pro, Final Cut Pro
- Understanding of broadcast standards
- Creative storytelling ability',
  'New Delhi',
  '₹5-7 LPA',
  'full-time',
  '2-4 years',
  '["Video Editing", "Adobe Premiere", "Final Cut Pro", "Storytelling"]',
  2,
  1,
  datetime('now'),
  datetime('now'),
  datetime('now')
);

INSERT INTO Job (id, title, description, location, salary, jobType, experience, skills, companyId, isActive, postedDate, createdAt, updatedAt)
VALUES (
  3,
  'Digital Marketing Intern',
  'Exciting internship opportunity for students interested in digital marketing and social media.

What you''ll do:
- Assist in managing social media accounts
- Create content for various platforms
- Analyze engagement metrics
- Support digital campaigns

Requirements:
- Currently pursuing degree in Mass Communication, Marketing, or related field
- Good understanding of social media platforms
- Creative mindset
- Basic knowledge of Canva or similar tools',
  'Bangalore, Karnataka',
  '₹15,000-20,000/month',
  'internship',
  'Fresher',
  '["Social Media", "Content Creation", "Digital Marketing", "Canva"]',
  1,
  1,
  datetime('now'),
  datetime('now'),
  datetime('now')
);
