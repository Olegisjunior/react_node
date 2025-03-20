const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require(`express`);

const app = express();
app.use(express.json());

app.get(`/`, (req, res) => {
    res.send(`Hello from the server!`);
});

app.get(`/posts`, async (req, res) => {
    const posts = await prisma.post.findMany()
    res.json(posts);
});

app.post(`/posts`, async (req, res) => {
    const {title, content, author} = req.body

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            author
        }
    })
    res.json(newPost);
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000:
        - http://localhost:3000/
        - http://localhost:3000/posts (get)
        - http://localhost:3000/posts (post)
        `);
});