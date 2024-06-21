const express = require('express');
const router = express.Router();
const multer = require('multer');
const { predict } = require('../controllers/modelController');

const upload = multer({ dest: 'uploads/' });

router.post('/predict', upload.single('file'), predict);

module.exports = router;
