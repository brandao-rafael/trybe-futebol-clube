import Teams from '../models/teams.model';

export default class TeamsService {
  public static async getAll() {
    const allTeams = await Teams.findAll();
    return allTeams;
  }

  public static async getById(id: number) {
    const allTeams = await Teams.findAll();
    if (allTeams.some((team) => team.id === id)) {
      const teamById = await Teams.findByPk(id);
      return teamById?.dataValues;
    }
    return null;
  }
}
