import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  public getAll = async (_req: Request, res: Response):Promise<void | Response> => {
    const allTeams = await TeamsService.getAll();
    return res.status(200).json([...allTeams]);
  };
}
