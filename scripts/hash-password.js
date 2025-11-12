#!/usr/bin/env node

/**
 * Utility script to generate bcrypt password hashes for admin accounts
 * Usage: node scripts/hash-password.js <password>
 * 
 * Example:
 *   node scripts/hash-password.js mySecurePassword123
 * 
 * Then copy the hash to your .env file as ADMIN_PASS
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Error: Password argument is required');
  console.log('\nUsage: node scripts/hash-password.js <password>');
  console.log('Example: node scripts/hash-password.js mySecurePassword123');
  process.exit(1);
}

const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  
  console.log('\n✅ Password hash generated successfully!\n');
  console.log('Copy this hash to your .env file as ADMIN_PASS:\n');
  console.log(hash);
  console.log('\nExample .env entry:');
  console.log(`ADMIN_PASS="${hash}"`);
  console.log('\nNote: The authentication system will automatically detect');
  console.log('whether the password is hashed or plain text for backward compatibility.\n');
});
