const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(path.join(__dirname, "../public/Images/uploads"))) {
      fs.mkdir(path.join(__dirname, "../public/Images/uploads"), (err) => {
        if (err) throw err;
      });
    }  

    cb(null, path.join(__dirname, "../public/Images/uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;