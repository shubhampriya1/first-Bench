import { NextFunction, Request, Response } from 'express';

export const admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (user && user.role === 'superadmin') {
      next();
    } else {
      return res.status(401).json({ message: 'Not authorized as an admin' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized as an admin' });
  }
};
