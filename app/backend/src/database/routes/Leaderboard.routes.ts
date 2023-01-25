import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

export default class Leaderboard {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/home', leaderboardController.getHome);
  }
}
