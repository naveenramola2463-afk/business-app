const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');
const { generateToken } = require('../utils/jwt');

// ---- REGISTER ----
const registerUser = async ({ name, email, password, role }) => {
  // Check karo email already exist toh nahi karta
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 400;
    throw error;
  }

  // Password hash karo (plain text kabhi save nahi karte)
  const hashedPassword = await bcrypt.hash(password, 10);

  // User create karo
  const userId = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
    role
  });

  // Token generate karo
  const token = generateToken({ id: userId, email, role: role || 'partner' });

  return {
    user: { id: userId, name, email, role: role || 'partner' },
    token
  };
};

// ---- LOGIN ----
const loginUser = async ({ email, password }) => {
  // User dhundo email se
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Password match karo
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Token generate karo
  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token
  };
};

module.exports = {
  registerUser,
  loginUser
};