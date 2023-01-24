import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public getAll = async (_req: Request, res: Response):Promise<void | Response> => {
    try {
      const allMatches = await MatchesService.getAll();
      return res.status(200).json(allMatches);
    } catch (error) {
      console.log(error);
    }
  };
}
