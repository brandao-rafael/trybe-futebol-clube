import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import validateToken from '../middleware/validateToken';

const matchesController = new MatchesController();

export default class Matches {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', matchesController.getAll);
    this.router.post('/', validateToken, matchesController.initNewMatch);
    this.router.patch('/:id/finish', matchesController.finishMatch);
  }
}
