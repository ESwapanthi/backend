const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
