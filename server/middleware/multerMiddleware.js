const multer = require('multer');
const path = require('path');
const fs = require('fs');  

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    const {type} = req.params;

    if (!fs.existsSync(path.join(__dirname, `../public/Images/${type}`))) {
      fs.mkdir(path.join(__dirname, `../public/Images/${type}`), (err) => {
        if (err) throw err;
      });
    }  

    cb(null, path.join(__dirname, `../public/Images/${type}`));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;