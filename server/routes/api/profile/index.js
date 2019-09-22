const express = require('express');
const auth = require('../../../middleware/auth');
const router = express.Router();

const getCurrentProfile = require('./getCurrentProfile');
const createUpdateProfile = require('./createUpdateProfile');
const getAllProfiles = require('./getAllProfiles');
const getUserProfile = require('./getUserProfile');
const deleteProfileAndUser = require('./deleteProfileAndUser');
const updateExperience = require('./updateExperience');
const deleteExperience = require('./deleteExperience');
const updateEducation = require('./updateEducation');
const deleteEducation = require('./deleteEducation');
const getGithubRepos = require('./getGithubRepos');

const { check } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, getCurrentProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  createUpdateProfile
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getAllProfiles);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by id
// @access  Private
router.get('/user/:user_id', auth, getUserProfile);

// @route   DELETE api/profile/user/:user_id
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, deleteProfileAndUser);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From data required')
        .not()
        .isEmpty()
    ]
  ],
  updateExperience
);

// @route   DELETE api/profile/experience/:id
// @desc    Add profile experience
// @access  Private
router.delete('/experience/:id', auth, deleteExperience);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study required')
        .not()
        .isEmpty(),
      check('from', 'From is required')
        .not()
        .isEmpty()
    ]
  ],
  updateEducation
);

// @route   DELETE api/profile/experience/:id
// @desc    Add profile experience
// @access  Private
router.delete('/education/:id', auth, deleteEducation);

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', getGithubRepos);

module.exports = router;
