import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import 'dotenv/config';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import protect from './middleware/auth-middleware';
import adminRouter from './routes/admin';
import { admin } from './middleware/admin-middleware';
import { connect } from './utils/db';

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use('/api/v1/auth', authRouter);

app.use(
  '/api/v1/user',
  (req: Request, res: Response, next: NextFunction) => {
    protect(req, res, next);
  },
  userRouter,
);

app.use(
  '/api/v1/admin',
  (req: Request, res: Response, next: NextFunction) => {
    protect(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    admin(req, res, next);
  },
  adminRouter,
);

app.use('*', (_: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

connect();

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
