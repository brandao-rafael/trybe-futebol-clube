import IcreateMatch from '../interfaces/IcreateMatch';
import IMatch from '../interfaces/IReturns/IMatch';
import IupdateLeaderBoardMatch from '../interfaces/IupdateLeaderboardMatch';
import Matches from '../models/matches.model';
import Teams from '../models/teams.model';

export default class MatchesService {
  public static async getAll():Promise<IMatch[]> {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches as unknown as IMatch[];
  }

  public static async getInprogress(condition: string):Promise<IMatch[]> {
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

  public static async initNewMatch(data: IcreateMatch):Promise<string | IMatch> {
    const allTeams = await this.getAll();

    if (data.homeTeamId === data.awayTeamId) {
      return 'equalTeams';
    }

    if (allTeams.some((team) => team.id === data.awayTeamId)
      && allTeams.some((team) => team.id === data.homeTeamId)) {
      const { dataValues } = await Matches.create({
        homeTeamId: data.homeTeamId,
        awayTeamId: data.awayTeamId,
        homeTeamGoals: data.homeTeamGoals,
        awayTeamGoals: data.awayTeamGoals,
        inProgress: true,
      });
      return dataValues;
    }
    return 'noTeam';
  }

  public static async finishMatch(id: number) {
    const dataValues = await Matches.update({ inProgress: false }, { where: { id } });
    return dataValues;
  }

  public static async updateLeaderBoard(data: IupdateLeaderBoardMatch) {
    const dataValues = Matches.findByPk(data.id);
    await Matches.update({
      homeTeamGoals: data.homeTeamGoals,
      awayTeamGoals: data.awayTeamGoals,
    }, {
      where: { id: data.id },
    });
    return dataValues;
  }
}
