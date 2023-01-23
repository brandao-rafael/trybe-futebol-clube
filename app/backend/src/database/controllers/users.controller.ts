import { Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UserController {
  public login = async (req: Request, res: Response):Promise<void | Response> => {
    const { email, password } = req.body;

    const token = await UserService.login(email, password);
    if (!token) res.status(401).send({ message: 'Incorrect email or password' });

    res.status(200).json({ token });
  };
}
