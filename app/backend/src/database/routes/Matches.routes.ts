import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middleware/validateToken';

const matchescontroller = new MatchesController();

export default class Matches {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', matchescontroller.getAll);
    this.router.post('/', validateToken, matchescontroller.initNewMatch);
  }
}
