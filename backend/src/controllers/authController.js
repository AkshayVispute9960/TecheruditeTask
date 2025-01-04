import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js'
import UserModel from '../model/authModel.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, password, } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.register(firstName,lastName, email, hashedPassword);
    return res.status(201).json(new ApiResponse(201, {firstName, lastName, email, lastName, role}, 'User registered successfully!'));
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return next({ status: 404, message: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return next({ status: 401, message: 'Invalid password!' });
    }

    const token = jwt.sign({ id: user.id , role:role}, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json(new ApiResponse(200, {name:user[0].username, email:user[0].email, token }, 'Login successful!'));
  } catch (error) {
    return next(error);
  }
};



export  {
  login,
  register
};