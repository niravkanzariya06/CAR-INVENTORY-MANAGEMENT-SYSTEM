const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign({ id, role }, secret, {
    expiresIn: '7d',
  });
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, adminSecret } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

if (!name?.trim() || !normalizedEmail || !password) {
  return res.status(400).json({
    message: 'Name, email, and password are required',
  });
}

if (password.length < 8) {
  return res.status(400).json({
    message: 'Password must be at least 8 characters',
  });
}
const existingUser = await User.findOne({
  email: normalizedEmail,
});

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

   
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    let assignedRole = 'user';
    if (role === 'admin') {
  const validAdminSecret = process.env.ADMIN_SECRET_KEY;

  if (!validAdminSecret || adminSecret !== validAdminSecret) {
    return res.status(403).json({
      message: 'Invalid admin secret key',
    });
  }

  assignedRole = 'admin';
}
    const user = await User.create({
  name: name.trim(),
  email: normalizedEmail,
  password,
  role: assignedRole,
});
    const token = generateToken(user._id.toString(), user.role);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString(), user.role);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
