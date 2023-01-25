import Matches from '../models/matches.model';
import Teams from '../models/teams.model';

export default class LeaderboardService {
  public static async getHomeMatchesData(id: number) {
    const finishedHomeMatches = await Matches
      .findAll({ where: { homeTeamId: id, inProgress: false } });
    let points = 0;
    let victory = 0;
    let draws = 0;

    finishedHomeMatches.forEach((data) => {
      if (data.dataValues.homeTeamGoals > data.dataValues.awayTeamGoals) {
        points += 3;
        victory += 1;
      }
      if (data.dataValues.homeTeamGoals === data.dataValues.awayTeamGoals) {
        points += 1;
        draws += 1;
      }
    });
    return { points, victory, draws };
  }

  public static async getHomeTotalGames(id: number) {
    const gamesPlayed = await Matches
      .findAll({ where: { homeTeamId: id, inProgress: false } });

    return gamesPlayed.length;
  }

  public static async getHomeGoals(id: number) {
    const finishedHomeMatches = await Matches
      .findAll({ where: { homeTeamId: id, inProgress: false } });

    let goalsFavor = 0;
    let goalsOwn = 0;

    finishedHomeMatches.forEach((data) => {
      goalsFavor += data.homeTeamGoals;
      goalsOwn += data.awayTeamGoals;
    });
    return { goalsFavor, goalsOwn };
  }

  public static async getAllHomeData(id: number) {
    const { points, victory, draws } = await this.getHomeMatchesData(id);
    const { goalsFavor, goalsOwn } = await this.getHomeGoals(id);
    const totalGames = await this.getHomeTotalGames(id);

    return { points, victory, draws, goalsFavor, goalsOwn, totalGames };
  }

  public static async getHome() {
    const allTeams = await Teams.findAll();
    const allHomeTeams = await Promise.all(allTeams.map(async (team) => {
      const { points, victory, draws, goalsFavor, goalsOwn, totalGames } = await this
        .getAllHomeData(team.id);
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
    return allHomeTeams;
  }

  public static async getHomeSorted() {
    const allHomeTeams = await this.getHome();
    return allHomeTeams.sort((a, b) => {
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
}
