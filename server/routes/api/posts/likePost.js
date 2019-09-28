const Post = require('../../../models/Post');

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    )
      return res.status(400).json({ message: 'Post already liked' });

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ message: 'Post not found' });

    res.status(500).send('Server error!');
  }
};

module.exports = likePost;
