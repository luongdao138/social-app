const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken } = require('../helpers/authToken');

module.exports = {
  async register(req, res) {
    try {
      const { fullname, username, email, password, gender } = req.body;
      let newUsername = username.toLowerCase().replace(/ /g, '');
      const user_name = await User.findOne({ username: newUsername });
      if (user_name) return res.status(400).json({ msg: 'This user name already exists!' });
      const user_email = await User.findOne({ email });
      if (user_email) return res.status(400).json({ msg: 'This email already exists!' });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      let newUser = new User({
        fullname,
        username: newUsername,
        email,
        password: passwordHash,
        gender,
      });

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/auth/refresh_token',
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
      });

      newUser = await newUser.save();
      delete newUser._doc.password;
      return res.json({ msg: 'Register success', accessToken, user: { ...newUser._doc } });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).populate('followers following');

      if (!user) return res.status(400).json({ msg: 'Email or password is not correct!' });

      const isPwMatch = await bcrypt.compare(password, user.password);
      if (!isPwMatch) return res.status(400).json({ msg: 'Email or password is not correct!' });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/auth/refresh_token',
        maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
      });

      delete user._doc.password;
      return res.json({ msg: 'Login success', accessToken, user: { ...user._doc } });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async logout(req, res) {
    try {
      res.clearCookie('refreshtoken', { path: '/api/v1/auth/refresh_token' });
      return res.json({ msg: 'Logout successfully!' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async generateAccessToken(req, res) {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) res.status(400).json({ msg: 'Please login now!' });

      jwt.verify(rf_token, process.env.REFFRESH_TOKEN_SECRET, async (error, result) => {
        if (error) return res.status(400).json({ msg: 'Please login now!' });

        const user = await User.findById(result.id, '-password').populate(
          'followers following',
          '-password'
        );

        if (!user) return res.status(400).json({ msg: 'This does not exist!' });

        const access_token = createAccessToken({ id: result.id });
        return res.json({ access_token, user });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
