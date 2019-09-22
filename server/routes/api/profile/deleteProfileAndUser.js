const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

const deleteProfileAndUser = async (req, res) => {
  try {
    // @todo -remove users posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
};

module.exports = deleteProfileAndUser;
