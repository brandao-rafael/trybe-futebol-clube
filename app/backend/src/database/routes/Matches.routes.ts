import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const matchescontroller = new MatchesController();

export default class Matches {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', matchescontroller.getAll);
  }
}
