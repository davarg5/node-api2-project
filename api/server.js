const express = require('express');
const cors = require cors('cors');
const server = express();

// import routers 
const postsRouter = require('./posts/postsrouter');

server.use(cors());
server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Blog Posts API</h2>
    <p>Welcome to the Blog Post API</p>
    `);
})

