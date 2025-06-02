const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Allow image + video types
const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm|mkv/;

const fileFilter = (req, file, cb) => {
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype.toLowerCase());

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"));
  }
};

const dynamicUpload = (fields, folderName) => {
  // Create folder if it doesn't exist
  const destinationPath = path.join(__dirname, `../../public/${folderName}`);
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + file.originalname;
      cb(null, uniqueSuffix);
    },
  });

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
  });

  return (req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    const isMultipart = contentType.startsWith("multipart/form-data");

    if (isMultipart) {
      upload.fields(fields)(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      });
    } else {
      next();
    }
  };
};

module.exports = {
  dynamicUpload,
};
