const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'song') {
        cb(null, 'uploads/songs');
      } else if (file.fieldname === 'image') {
        cb(null, 'uploads/images');
      } else {
        cb(new Error('Campo de archivo no válido'));
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
  });
  
const upload = multer({ storage });
module.exports = upload