const Profile = require('../../../models/Profile');

const getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user!' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found!' });

    res.status(500).send('Server error!');
  }
};

module.exports = getUserProfile;
