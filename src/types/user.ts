import mongoose from 'mongoose';

export interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  role: 'user' | 'superadmin';
  createdAt: Date;
  updatedAt: Date;
}
