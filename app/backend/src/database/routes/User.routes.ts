import * as express from 'express';
import UserController from '../controllers/users.controller';

const userController = new UserController();

export default class Login {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/', userController.login);
  }
}
