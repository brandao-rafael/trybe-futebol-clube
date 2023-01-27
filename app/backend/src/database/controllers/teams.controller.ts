import { Request, Response } from 'express';
import ITeamsController from '../interfaces/IController/ITeamsController';
import TeamsService from '../services/teams.service';

export default class TeamsController implements ITeamsController {
  public getAll = async (_req: Request, res: Response):Promise<void | Response> => {
    const allTeams = await TeamsService.getAll();
    return res.status(200).json([...allTeams]);
  };

  public getById = async (req: Request, res: Response):Promise<void | Response> => {
    const { id } = req.params;
    const Team = await TeamsService.getById(Number(id));
    return res.status(200).json({ ...Team });
  };
}
