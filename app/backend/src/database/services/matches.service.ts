import IcreateMatch from '../interfaces/IcreateMatch';
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

  public static async getInprogress(condition: string) {
    let conditionBool = true;
    const allMatches = this.getAll();

    if (condition === 'true') {
      conditionBool = true;
    } else {
      conditionBool = false;
    }

    const filteredMatches = (await allMatches)
      .filter((match) => match.inProgress === conditionBool);
    return filteredMatches;
  }

  public static async initNewMatch(data: IcreateMatch) {
    const { dataValues } = await Matches.create({
      homeTeamId: data.homeTeamId,
      awayTeamId: data.awayTeamId,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: true,
    });

    return dataValues;
  }
}
