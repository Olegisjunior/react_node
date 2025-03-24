const prisma = require('../models/postModel');

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostByQuery = async (req, res) => {
  try {
    const { title, author, category } = req.query;
    const filters = {};

    if (title) {
      filters.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (author) {
      filters.author = {
        contains: author,
        mode: 'insensitive',
      };
    }

    if (category) {
      filters.category = {
        contains: category,
        mode: 'insensitive',
      };
    }
    const post = await prisma.post.findMany({
      where: {
        ...filters,
      },
    });

    if (post.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author,
        category,
      },
    });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  getPostById,
  deletePost,
  getPostByQuery,
  createPost,
};
