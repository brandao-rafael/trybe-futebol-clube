import { Request, Response } from 'express';
import ILeaderboardController from '../interfaces/IController/ILeaderboardController';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController implements ILeaderboardController {
  public getHome = async (_req: Request, res: Response): Promise<void | Response> => {
    const leaderboard = await LeaderboardService.getHome();
    return res.status(200).json(leaderboard);
  };

  public getAway = async (_req: Request, res: Response): Promise<void | Response> => {
    const leaderboard = await LeaderboardService.getAway();
    return res.status(200).json(leaderboard);
  };

  public getAll = async (_req: Request, res: Response): Promise<void | Response> => {
    const leaderboard = await LeaderboardService.getAll();
    return res.status(200).json(leaderboard);
  };
}
