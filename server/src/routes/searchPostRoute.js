const express = require('express');
const router = express.Router();

const { getPostByQuery } = require('../controllers/postController');

router.get('/', getPostByQuery);

module.exports = router;
