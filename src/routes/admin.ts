import { Router, Request, Response } from 'express';
import { activateAccount, createAdmin, getAllUsers } from '../controllers/admin';

const adminRouter = Router();

adminRouter.get('/users', getAllUsers);

adminRouter.put('/activate', (req: Request, res: Response) => {
  activateAccount(req, res);
});

adminRouter.post('/create-admin', (req: Request, res: Response) => {
  createAdmin(req, res);
});

export default adminRouter;
