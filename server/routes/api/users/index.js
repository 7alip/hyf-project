const express = require('express');
const router = express.Router();

const registerUser = require('./registerUser');

const { check } = require('express-validator');

/**
 * @route POST /api/users
 * @desc Register user
 * @access Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required!')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  registerUser
);

module.exports = router;
