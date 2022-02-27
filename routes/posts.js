const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.get('/', postsController.getAllPosts);
router.post('/', postsController.addNewPost);
// router.get('/:id', postsController.getPostById);
router.get('/:authorid', postsController.getPostsByAuthorId);
router.put('/:id', postsController.updatePostById);
router.delete('/:id', postsController.deletePostById);

module.exports = router;