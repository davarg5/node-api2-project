const express = require('express');
const Post = require('./../../data/db');

const router = express.Router();

router.post('/', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    Post.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
})

router.post('/:id/comments', (req, res) => {
    if(!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }
    Post.insertComment(req.body)
        .then(comment => {
            if(!comment) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            res.status(201).json(comment);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ error: "There was an error while saving the comment to the database" });
        })
})

router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        .then(post => {
            if(!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            res.status(200).json(post);
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    Post.findPostComments(id)
        .then(comments => {
            if(!comments) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            res.status(200).json(comments);
        })
        .catch(() => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
        })
    
})

router.delete('/:id', (req, res) => {
    
})

router.put('/:id', (req, res) => {
    
})

module.exports = router;