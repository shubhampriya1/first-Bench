import { Request, Response, Router } from 'express';
import { login, logout, register } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  login(req, res);
});

authRouter.post('/register', (req: Request, res: Response) => {
  register(req, res);
});

authRouter.get('/logout', (req: Request, res: Response) => {
  logout(req, res);
});

export default authRouter;
