const express = require("express");
const { protect } = require("../middleware/auth");
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getMyPosts
} = require("../controllers/postController");

const router = express.Router();

router.get('/', getAllPosts);
router.get('/my', protect, getMyPosts);
router.get('/:id', getPostById);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;