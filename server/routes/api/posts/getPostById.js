const Post = require('../../../models/Post');

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ date: -1 });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ message: 'Post not found' });

    res.status(500).send('Server error!');
  }
};

module.exports = getPostById;
