import { Request, Response } from 'express';
import User from '../models/user';
import { validate } from '../utils/validate';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const skip = (page - 1) * pageSize;
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);

    const users = await User.find().select('-password').skip(skip).limit(pageSize);

    res.status(200).json({
      page,
      pageSize,
      totalPages,
      totalUsers,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const activateAccount = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    validate(email, 'email', res);

    await User.updateOne({ email: email }, { isActive: true });

    res.status(200).json({ message: 'Account activated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  validate(email, 'email', res);

  try {
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res.status(400).json({ message: 'User not found, Please register user first' });
    }

    await User.updateOne({ email: email }, { role: 'superadmin' });

    res.status(200).json({ message: 'Admin created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
