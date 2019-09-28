const Post = require('../../../models/Post');

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(c => c.id === req.params.comment_id);

    // Make sure comment exists
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'User not authorized' });

    const removeIndex = post.comments
      .map(c => c.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ message: 'Post not found' });

    res.status(500).send('Server error!');
  }
};

module.exports = deleteComment;
