import getAllHomeData from './helpers/homeTeam';
import getAllAwayData from './helpers/awayTeam';
import Teams from '../models/teams.model';
import Ileaderboard from '../interfaces/Ileaderboard';

export default class LeaderboardService {
  public static async sortTeam(team: Ileaderboard[]) {
    return team.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      } if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      } if (a.goalsFavor !== b.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }
      return b.goalsOwn - a.goalsOwn;
    });
  }

  public static async getHome() {
    const allTeams = await Teams.findAll();
    const allHomeTeams = await Promise.all(allTeams.map(async (team) => {
      const {
        points, victory, draws, goalsFavor, goalsOwn, totalGames } = await getAllHomeData(team.id);
      return {
        name: team.teamName,
        totalPoints: points,
        totalGames,
        totalVictories: victory,
        totalDraws: draws,
        totalLosses: totalGames - victory - draws,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: ((points / (totalGames * 3)) * 100).toFixed(2),
      };
    }));
    return this.sortTeam(allHomeTeams);
  }

  public static async getAway() {
    const allTeams = await Teams.findAll();
    const allAwayTeams = await Promise.all(allTeams.map(async (team) => {
      const {
        points, victory, draws, goalsFavor, goalsOwn, totalGames } = await getAllAwayData(team.id);
      return {
        name: team.teamName,
        totalPoints: points,
        totalGames,
        totalVictories: victory,
        totalDraws: draws,
        totalLosses: totalGames - victory - draws,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: ((points / (totalGames * 3)) * 100).toFixed(2),
      };
    }));
    return this.sortTeam(allAwayTeams);
  }
}
