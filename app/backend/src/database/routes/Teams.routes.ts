import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsController = new TeamsController();

export default class Teams {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', teamsController.getAll);
    this.router.get('/:id', teamsController.getById);
  }
}
