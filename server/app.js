const express = require(`express`);
const postRoute = require(`./src/routes/postRoute`);
const searchPostRoute = require(`./src/routes/searchPostRoute`);
const userRoute = require(`./src/routes/userRoute`);

const app = express();
app.use(express.json());

app.use('/posts/search', searchPostRoute);
app.use('/posts', postRoute);

app.use('/users', userRoute);

app.listen(3000, () => {
   console.log(`Server is running on port 3000:
        - http://localhost:3000/
        - http://localhost:3000/posts (get)
        - http://localhost:3000/posts (post)
        `);
});

// api create user
