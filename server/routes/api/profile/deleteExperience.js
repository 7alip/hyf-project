const Profile = require('../../../models/Profile');

const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get removeIndex
    const removeIndex = profile.experiences
      .map(item => item.id)
      .indexOf(req.params.id);

    profile.experiences.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
};

module.exports = deleteExperience;
