const express = require('express')
const multer = require('multer');
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage }).array('video');

router.use(express.static('public'));

router.post('/coursevideo', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err)
    }

    return res.status(200).send(req.files)
  })
});



module.exports = router;