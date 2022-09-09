const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

exports.upload = upload;
