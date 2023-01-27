import { Request, Response } from 'express';

export default interface ILeaderboardController {
  getHome(_req: Request, res: Response): Promise<void | Response>;

  getAway(_req: Request, res: Response): Promise<void | Response>;

  getAll(_req: Request, res: Response): Promise<void | Response>;
}
