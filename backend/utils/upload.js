const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use an absolute path anchored to this file, not a bare 'uploads/' string.
// A relative path is resolved against process.cwd() — which changes
// depending on how/where the server is started (npm script, PM2, Docker
// WORKDIR, monorepo root, etc.) — so it can silently point at a directory
// that doesn't exist, causing every upload to fail with ENOENT.
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Images (avatar/project/blog) + PDF/Word (resume). The resume upload form
// in the dashboard advertises .pdf, .doc and .docx — but this filter only
// allowed pdf, silently rejecting doc/docx with a generic error and making
// it look like uploads were broken.
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const allowedMimes = /image\/(jpeg|jpg|png|gif)|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/;
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
