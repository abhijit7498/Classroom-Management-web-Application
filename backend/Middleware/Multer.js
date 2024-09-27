const multer  = require('multer')
const fs = require('fs');

const path = './NotesData';
if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, './NotesData')
    },
    filename: function (req, file, cb) {
          const uniqueSuffix = Date.now()
          cb(null, uniqueSuffix + '-' + file.originalname); 
        
        }
    })
   const upload = multer({ storage: storage });
   module.exports=upload;