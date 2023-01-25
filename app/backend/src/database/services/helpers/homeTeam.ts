import Matches from '../../models/matches.model';

async function getHomeMatchesData(id: number) {
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

async function getHomeTotalGames(id: number) {
  const gamesPlayed = await Matches
    .findAll({ where: { homeTeamId: id, inProgress: false } });

  return gamesPlayed.length;
}

async function getHomeGoals(id: number) {
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

export default async function getAllHomeData(id: number) {
  const { points, victory, draws } = await getHomeMatchesData(id);
  const { goalsFavor, goalsOwn } = await getHomeGoals(id);
  const totalGames = await getHomeTotalGames(id);

  return { points, victory, draws, goalsFavor, goalsOwn, totalGames };
}
