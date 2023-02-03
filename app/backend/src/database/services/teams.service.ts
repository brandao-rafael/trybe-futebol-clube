import Teams from '../models/teams.model';
import Iteam from '../interfaces/IReturns/ITeam';

export default class TeamsService {
  public static async getAll():Promise<Iteam[] | null> {
    const allTeams = await Teams.findAll();
    return allTeams;
  }

  public static async getById(id: number):Promise<Iteam | null> {
    const allTeams = await Teams.findAll();
    if (allTeams.some((team) => team.id === id)) {
      const teamById = await Teams.findByPk(id);
      return teamById?.dataValues;
    }
    return null;
  }
}
