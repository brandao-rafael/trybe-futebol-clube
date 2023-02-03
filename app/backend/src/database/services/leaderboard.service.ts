import getAllHomeData from './helpers/homeTeam';
import getAllAwayData from './helpers/awayTeam';
import Teams from '../models/teams.model';
import Ileaderboard from '../interfaces/Ileaderboard';
import ILeaderboard from '../interfaces/IReturns/ILeaderboard';

export default class LeaderboardService {
  private static async sortTeam(team: Ileaderboard[]) {
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

  public static async getHome():Promise<ILeaderboard[]> {
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

  public static async getAway():Promise<ILeaderboard[]> {
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

  private static getBalance(homeTeam: Ileaderboard, awayTeam: Ileaderboard | undefined) {
    const totalPoints = homeTeam.totalPoints + Number(awayTeam?.totalPoints);
    const totalGamesTriplifyed = (homeTeam.totalGames + Number(awayTeam?.totalGames)) * 3;

    const result = (totalPoints / totalGamesTriplifyed) * 100;
    return result.toFixed(2);
  }

  public static async getAll():Promise<ILeaderboard[]> {
    const awayTeamLeaderboard = await this.getAway();
    const homeTeamLeaderboard = await this.getHome();
    const leaderboard = homeTeamLeaderboard.map((homeTeam) => {
      const awayTeam = awayTeamLeaderboard.find((team) => team.name === homeTeam.name);
      return {
        name: homeTeam.name,
        totalPoints: homeTeam.totalPoints + Number(awayTeam?.totalPoints),
        totalGames: homeTeam.totalGames + Number(awayTeam?.totalGames),
        totalVictories: homeTeam.totalVictories + Number(awayTeam?.totalVictories),
        totalDraws: homeTeam.totalDraws + Number(awayTeam?.totalDraws),
        totalLosses: homeTeam.totalLosses + Number(awayTeam?.totalLosses),
        goalsFavor: homeTeam.goalsFavor + Number(awayTeam?.goalsFavor),
        goalsOwn: homeTeam.goalsOwn + Number(awayTeam?.goalsOwn),
        goalsBalance: homeTeam.goalsBalance + Number(awayTeam?.goalsBalance),
        efficiency: this.getBalance(homeTeam, awayTeam),
      };
    });
    return this.sortTeam(leaderboard);
  }
}
