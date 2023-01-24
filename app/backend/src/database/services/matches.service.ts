import Matches from '../models/matches.model';
import Teams from '../models/teams.model';

export default class MatchesService {
  public static async getAll() {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public static async getInprogress() {
    const allMatches = this.getAll();
    const filteredMatches = (await allMatches)
      .filter((match) => match.inProgress === true);
    return filteredMatches;
  }
}
