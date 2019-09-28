const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Bad request 400
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user exist
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: [{ message: 'User already exist' }] });
    }

    // Get avatar
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    user = new User({
      name,
      email,
      avatar,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
};

module.exports = registerUser;
