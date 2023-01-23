import Teams from '../models/teams.model';

export default class TeamsService {
  public static async getAll() {
    const allTeams = await Teams.findAll();
    return allTeams;
  }
}
