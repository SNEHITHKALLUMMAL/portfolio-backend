const multer = require('multer');
const path = require('path');

// Files are now streamed to Cloudinary instead of saved to local disk, so we
// use memoryStorage: multer just buffers the file in RAM (req.file.buffer /
// req.files[i].buffer) and the controller hands that buffer to Cloudinary.
// This also makes uploads work correctly on hosts with ephemeral/read-only
// filesystems (Render, Vercel, Heroku, etc.), where writing to a local
// "uploads/" folder either fails or gets wiped on every deploy.
const storage = multer.memoryStorage();

// Images (avatar/project/blog) + PDF/Word (resume).
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
  const allowedMimes = /image\/(jpeg|jpg|png|gif|webp)|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image, PDF, and Word document files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: fileFilter
});

module.exports = upload;
