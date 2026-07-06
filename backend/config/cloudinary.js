const cloudinary = require('cloudinary').v2;

// Fail fast if Cloudinary isn't configured — otherwise every upload would
// fail deep inside a request with a confusing "Must supply api_key" error.
const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.warn(
    `Cloudinary is not fully configured. Missing env vars: ${missing.join(', ')}. ` +
    `Image/file uploads will fail until these are set.`
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

module.exports = cloudinary;
