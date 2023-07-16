const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const UserModel = require('../Models/User');

// Endpoints


router.post('/user', async (req, res) => {
  const { password, name, lastname, phone, email } = req.body;

  try {
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const nameExists = await UserModel.findOne({ name });
    if (nameExists) {
      return res.status(400).json({ error: 'Name already exists' });
    }
    const lastnameExists = await UserModel.findOne({ lastname });
    if (lastnameExists) {
      return res.status(400).json({ error: 'Lastname already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      password: hashedPassword,
      name,
      lastname,
      phone,
      email
    });

    res.send({ status: 'user created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      process.env.APP_JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;