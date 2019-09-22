const Profile = require('../../../models/Profile');

const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get removeIndex
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
};

module.exports = deleteEducation;
