import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.isActive === false) {
      return res.status(401).json({
        message: 'User is not active. Please contact support for more information.',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default protect;
