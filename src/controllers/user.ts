import { Request, Response } from 'express';
import User from '../models/user';

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export async function deactivateAccount(req: Request, res: Response) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    await User.updateOne({ _id: user._id }, { isActive: false });

    return res.status(200).json({ message: 'Account deactivated' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
