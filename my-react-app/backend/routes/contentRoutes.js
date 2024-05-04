
const express = require('express');
const contentController = require('../controllers/contentController');

const router = express.Router();

router.post('/content', contentController.createContent);
router.get('/content', contentController.getAllContent);
router.delete('/content/:id', contentController.deleteContent);
router.put('/content/:id', contentController.updateContent);

module.exports = router;
