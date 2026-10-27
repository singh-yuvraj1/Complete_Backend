const express = require('express');
const multer = require('multer');
const cors = require('cors');

const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage()
});


// =============================
// CREATE POST
// =============================

app.post('/create-post', upload.single('image'), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const result = await uploadFile(req.file.buffer);

        const post = await postModel.create({
            image_url: result.url,
            image_public_id: result.public_id,
            caption: req.body.caption
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
});


// =============================
// GET ALL POSTS
// =============================

app.get('/posts', async (req, res) => {

    try {

        const posts = await postModel
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });

    } catch (error) {

        res.status(500).json({
            message: "Error fetching posts",
            error: error.message
        });
    }
});


// =============================
// UPDATE POST
// =============================

app.put('/posts/:id', upload.single('image'), async (req, res) => {

    try {

        const { id } = req.params;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        let image_url = post.image_url;
        let image_public_id = post.image_public_id;

        // If user uploads a new image
        if (req.file) {

            const result = await uploadFile(req.file.buffer);

            image_url = result.url;
            image_public_id = result.public_id;
        }

        post.caption = req.body.caption ?? post.caption;
        post.image_url = image_url;
        post.image_public_id = image_public_id;

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error updating post",
            error: error.message
        });
    }
});


// =============================
// DELETE POST
// =============================

app.delete('/posts/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const post = await postModel.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post deleted successfully",
            post
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error deleting post",
            error: error.message
        });
    }
});


module.exports = app;