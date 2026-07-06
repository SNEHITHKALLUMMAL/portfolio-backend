/**
 * One-time script to create (or promote) the site owner's admin account.
 *
 * Why this exists: the public /api/auth/register endpoint always creates
 * 'user' role accounts (by design, for security). Since this portfolio has
 * exactly one owner/admin, that account needs to be created directly
 * against the database instead of through a public API.
 *
 * Usage (from the backend/ folder, with your .env configured):
 *   node utils/seedAdmin.js
 *
 * Reads these from your .env / environment:
 *   MONGODB_URI     - required
 *   ADMIN_NAME      - optional, defaults to "Admin"
 *   ADMIN_EMAIL     - required
 *   ADMIN_PASSWORD  - required (min 6 characters)
 *
 * If a user with ADMIN_EMAIL already exists, this promotes them to admin
 * and (optionally) resets their password if ADMIN_PASSWORD is provided.
 * Otherwise it creates a brand new admin user.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function seedAdmin() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI in environment. Aborting.');
    process.exit(1);
  }
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env before running this script.');
    process.exit(1);
  }
  if (ADMIN_PASSWORD.length < 6) {
    console.error('ADMIN_PASSWORD must be at least 6 characters.');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() }).select('+password');

  if (existing) {
    existing.role = 'admin';
    existing.password = ADMIN_PASSWORD; // will be re-hashed by the pre-save hook
    existing.name = ADMIN_NAME || existing.name;
    await existing.save();
    console.log(`Existing user ${ADMIN_EMAIL} promoted to admin and password reset.`);
  } else {
    await User.create({
      name: ADMIN_NAME || 'Admin',
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
      role: 'admin'
    });
    console.log(`Admin user ${ADMIN_EMAIL} created successfully.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('Failed to seed admin user:', err);
  process.exit(1);
});
