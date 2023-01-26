import Matches from '../../models/matches.model';

async function getMatchesData(id: number) {
  const finishedMatches = await Matches
    .findAll({ where: { $or: { awayTeamId: id, homeTeamId: id }, inProgress: false } });
  let points = 0;
  let victory = 0;
  let draws = 0;

  finishedMatches.forEach((data) => {
    if (data.dataValues.awayTeamGoals > data.dataValues.homeTeamGoals) {
      points += 3;
      victory += 1;
    }
    if (data.dataValues.awayTeamGoals === data.dataValues.homeTeamGoals) {
      points += 1;
      draws += 1;
    }
  });
  return { points, victory, draws };
}

async function getTotalGames(id: number) {
  const gamesPlayed = await Matches
    .findAll({ where: { awayTeamId: id, inProgress: false } });

  return gamesPlayed.length;
}

async function getGoals(id: number) {
  const finishedAwayMatches = await Matches
    .findAll({ where: { awayTeamId: id, inProgress: false } });

  let goalsFavor = 0;
  let goalsOwn = 0;

  finishedAwayMatches.forEach((data) => {
    goalsFavor += data.awayTeamGoals;
    goalsOwn += data.homeTeamGoals;
  });
  return { goalsFavor, goalsOwn };
}

export default async function getAllData(id: number) {
  const { points, victory, draws } = await getMatchesData(id);
  const { goalsFavor, goalsOwn } = await getGoals(id);
  const totalGames = await getTotalGames(id);

  return { points, victory, draws, goalsFavor, goalsOwn, totalGames };
}
