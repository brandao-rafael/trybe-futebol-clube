import Matches from '../models/matches.model';

export default class MatchesService {
  public static async getAll() {
    const matches = await Matches.findAll();
    return matches;
  }
}
