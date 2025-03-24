const express = require(`express`);
const router = express.Router();

const { getPosts, getPostById, createPost, deletePost } = require('../controllers/postController');
const e = require('express');

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);

module.exports = router;
