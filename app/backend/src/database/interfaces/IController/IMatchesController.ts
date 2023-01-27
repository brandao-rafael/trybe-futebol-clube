import { Request, Response } from 'express';

export default interface IMatchesController {
  getAll(req: Request, res: Response): Promise<void | Response>;

  initNewMatch(req: Request, res: Response): Promise<void | Response>;

  finishMatch(req: Request, res: Response): Promise<void | Response>;

  updateLeaderboard(req: Request, res: Response): Promise<void | Response>;
}
