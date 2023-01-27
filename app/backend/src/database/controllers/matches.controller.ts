import { Request, Response } from 'express';
import IMatchesController from '../interfaces/IController/IMatchesController';
import MatchesService from '../services/matches.service';

export default class MatchesController implements IMatchesController {
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

    switch (insertedMatch) {
      case 'equalTeams':
        return res.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      case 'noTeam':
        return res.status(404).json({ message: 'There is no team with such id!' });
      default:
        return res.status(201).json(insertedMatch);
    }
  };

  public finishMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;
    await MatchesService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateLeaderboard = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;
    const data = req.body;
    const dataToSend = {
      id: Number(id),
      ...data,
    };

    const match = await MatchesService.updateLeaderBoard(dataToSend);

    return res.status(200).json(match);
  };
}
