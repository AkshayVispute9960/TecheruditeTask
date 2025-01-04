import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js'
import UserModel from '../model/authModel.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import sendVerificationEmail from '../utils/emailService.js'

const register = async (req, res, next) => {
  console.log('register hitting')
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const user = await UserModel.register(firstName, lastName, email, hashedPassword, role);

    await sendVerificationEmail(email, verificationToken);
            return res.status(201).json(new ApiResponse(201, {firstName, lastName, email, lastName, role}, 'User registered successfully! Please verify your email'));
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return next({ status: 404, message: 'User not found!' });
    }
    console.log("user",user[0].role)

    if (user[0].role !== 'admin') {
      return res.status(403).json(new ApiResponse(403, {}, 'You are not allowed to login from here'));
  }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return next({ status: 401, message: 'Invalid password!' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json(new ApiResponse(200, {name:user[0].username, email:user[0].email, token }, 'Login successful!'));
  } catch (error) {
    return next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await UserModel.isVerified(decoded.email);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found or already verified.' });
    }

    return res.status(201).json(new ApiResponse(201, {}, 'Email verified successfully.'));
  } catch (error) {
    console.error('Error verifying email:', error.message);
    return res.status(400).json({ error: 'Invalid or expired token!' });
  }
};


export  {
  login,
  register,
  verifyEmail
};