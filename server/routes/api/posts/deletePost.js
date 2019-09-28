const Post = require('../../../models/Post');

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'User not authorized' });

    await post.remove();

    res.json({ message: 'Post deleted!' });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ message: 'Post not found' });

    res.status(500).send('Server error!');
  }
};

module.exports = deletePost;
