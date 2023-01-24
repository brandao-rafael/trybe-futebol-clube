import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public getAll = async (req: Request, res: Response): Promise<void | Response> => {
    if (req.query.inProgress) {
      const { inProgress } = req.query;

      const matchesInProgress = await MatchesService.getInprogress(inProgress.toString());
      return res.status(200).json(matchesInProgress);
    }
    const allMatches = await MatchesService.getAll();
    return res.status(200).json(allMatches);
  };
}
