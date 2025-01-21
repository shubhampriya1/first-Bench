import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user';
import { Field, validate } from '../utils/validate';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please provide email and password',
    });
  }

  for (const [field, value] of Object.entries({ email, password })) {
    const { isValid, errorMessage } = validate(field as Field, value);
    if (!isValid) {
      return res.status(400).json({ message: errorMessage });
    }
  }

  try {
    const user = await User.findOne({
      email,
    }).select('+password');

    if (!user) {
      return res.status(404).json({
        message: 'Invalid credentials',
      });
    }

    if (user.isActive === false) {
      return res.status(401).json({
        message: 'User is not active. Please contact support for more information.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        message: 'Invalid credentials',
      });
    }

    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '30d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login successful',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: 'Please provide name, email, password, and phone',
    });
  }

  // Validate all fields
  for (const [field, value] of Object.entries({ name, email, password, phone })) {
    const { isValid, errorMessage } = validate(field as Field, value);
    if (!isValid) {
      return res.status(400).json({ message: errorMessage });
    }
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber: phone,
    });

    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '30d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: 'Account created',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export async function logout(_: Request, res: Response) {
  res.clearCookie('token');

  return res.status(200).json({
    message: 'Logout successful',
  });
}
