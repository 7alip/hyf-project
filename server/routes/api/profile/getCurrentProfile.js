const Profile = require('../../../models/Profile');

const getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ message: 'There is no profile for this user!' });
    }

    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
};

module.exports = getCurrentProfile;
