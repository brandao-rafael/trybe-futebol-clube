import { Request, Response } from 'express';
import IUserController from '../interfaces/IController/IUserController';
import UserService from '../services/users.service';

export default class UserController implements IUserController {
  public login = async (req: Request, res: Response):Promise<void | Response> => {
    const { email, password } = req.body;

    const token = await UserService.login(email, password);
    if (!token) return res.status(401).send({ message: 'Incorrect email or password' });

    return res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response):Promise<void | Response> => {
    const { id } = req.body.user;
    const role = await UserService.getRole(id);
    return res.status(200).json({ role });
  };
}
