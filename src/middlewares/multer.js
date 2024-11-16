const multer = require("multer");

const storage = multer.diskStorage({
    destination: "src/fileStorage", 
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage
})

const singleUpload = upload.single("file")

module.exports = singleUpload;
