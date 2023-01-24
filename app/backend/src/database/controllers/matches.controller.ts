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

  public initNewMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const data = req.body;
    const insertedMatch = await MatchesService.initNewMatch(data);
    return res.status(201).json(insertedMatch);
  };

  public finishMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;
    await MatchesService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };
}
