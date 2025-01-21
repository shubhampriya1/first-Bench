import { Request, Response, Router } from 'express';
import { getUserDetails, deactivateAccount } from '../controllers/user';

const userRouter = Router();

userRouter.get('/me', (req: Request, res: Response) => {
  getUserDetails(req, res);
});

userRouter.put('/deactivate', (req: Request, res: Response) => {
  deactivateAccount(req, res);
});

export default userRouter;
