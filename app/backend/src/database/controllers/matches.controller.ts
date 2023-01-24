import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public getAll = async (req: Request, res: Response): Promise<void | Response> => {
    console.log(req);
    if (req.query.inProgress === 'true') {
      const matchesInProgress = await MatchesService.getInprogress();
      return res.status(200).json(matchesInProgress);
    }
    const allMatches = await MatchesService.getAll();
    return res.status(200).json(allMatches);
  };
}
