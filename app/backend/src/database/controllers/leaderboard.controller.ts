import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public getHome = async (_req: Request, res: Response): Promise<void | Response> => {
    const leaderboard = await LeaderboardService.getHomeSorted();
    return res.status(200).json(leaderboard);
  };
}
