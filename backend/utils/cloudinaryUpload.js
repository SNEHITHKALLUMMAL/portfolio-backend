const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');

/**
 * Uploads an in-memory file buffer (from multer's memoryStorage) to Cloudinary.
 *
 * @param {Buffer} buffer - The raw file buffer (req.file.buffer / req.files[i].buffer)
 * @param {Object} options
 * @param {string} options.folder - Cloudinary folder to organize uploads (e.g. 'portfolio/avatars')
 * @param {string} [options.resource_type='image'] - 'image', 'video', 'raw', or 'auto'.
 *        Use 'auto' for resumes (pdf/doc/docx) so Cloudinary picks the right handling.
 * @param {string} [options.public_id] - Optional custom public ID.
 * @returns {Promise<Object>} Cloudinary upload result ({ secure_url, public_id, ... })
 */
const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'portfolio',
        resource_type: options.resource_type || 'image',
        public_id: options.public_id,
        overwrite: true
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

/**
 * Deletes an asset from Cloudinary given its public_id.
 * Safe to call even if the asset doesn't exist / public_id is missing —
 * failures here shouldn't block the main request (e.g. replacing an avatar).
 *
 * @param {string} publicId
 * @param {string} [resourceType='image']
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (err) {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, err.message);
  }
};

/**
 * Extracts the Cloudinary public_id from a secure_url so old assets can be
 * cleaned up when they're replaced. Returns null if the URL isn't a
 * recognizable Cloudinary URL (e.g. an old local /uploads/ path).
 *
 * @param {string} url
 * @returns {string|null}
 */
const getPublicIdFromUrl = (url) => {
  if (!url || !/res\.cloudinary\.com/.test(url)) return null;
  try {
    // e.g. https://res.cloudinary.com/<cloud>/image/upload/v169.../portfolio/avatars/abc123.jpg
    const afterUpload = url.split('/upload/')[1];
    if (!afterUpload) return null;
    const withoutVersion = afterUpload.replace(/^v\d+\//, '');
    const withoutExt = withoutVersion.replace(/\.[^/.]+$/, '');
    return withoutExt;
  } catch {
    return null;
  }
};

module.exports = { uploadBufferToCloudinary, deleteFromCloudinary, getPublicIdFromUrl };
