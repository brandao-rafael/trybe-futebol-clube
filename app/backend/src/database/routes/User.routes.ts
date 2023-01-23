import * as express from 'express';
import ValidateLogin from '../middleware/userMiddlewares';
import UserController from '../controllers/users.controller';
import validateToken from '../middleware/validateToken';

const userController = new UserController();

export default class Login {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/', ValidateLogin, userController.login);
    this.router.get('/validate', validateToken, userController.getRole);
  }
}
