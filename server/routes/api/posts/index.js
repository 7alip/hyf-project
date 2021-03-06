const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../../middleware/auth');
const createPost = require('./createPost');
const getAllPosts = require('./getAllPosts');
const getPostById = require('./getPostById');
const deletePost = require('./deletePost');
const likePost = require('./likePost');
const unlikePost = require('./unlikePost');
const createComment = require('./createComment');
const deleteComment = require('./deleteComment');

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  createPost
);

// @route   GET /api/posts
// @desc    Get all post
// @access  Private
router.get('/', auth, getAllPosts);

// @route   GET /api/posts/:id
// @desc    Get all post
// @access  Private
router.get('/:id', auth, getPostById);

// @route   DELETE /api/posts/:id
// @desc    Get all post
// @access  Private
router.delete('/:id', auth, deletePost);

// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, likePost);

// @route   PUT /api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, unlikePost);

// @route   POST /api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  createComment
);

// @route   DELETE /api/posts/comment/:id
// @desc    Delete comment of a post
// @access  Private
router.delete('/comment/:id/:comment_id', auth, deleteComment);

module.exports = router;
