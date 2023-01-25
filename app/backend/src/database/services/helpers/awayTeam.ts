import Matches from '../../models/matches.model';

async function getAwayMatchesData(id: number) {
  const finishedAwayMatches = await Matches
    .findAll({ where: { awayTeamId: id, inProgress: false } });
  let points = 0;
  let victory = 0;
  let draws = 0;

  finishedAwayMatches.forEach((data) => {
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

async function getAwayTotalGames(id: number) {
  const gamesPlayed = await Matches
    .findAll({ where: { awayTeamId: id, inProgress: false } });

  return gamesPlayed.length;
}

async function getAwayGoals(id: number) {
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

export default async function getAllAwayData(id: number) {
  const { points, victory, draws } = await getAwayMatchesData(id);
  const { goalsFavor, goalsOwn } = await getAwayGoals(id);
  const totalGames = await getAwayTotalGames(id);

  return { points, victory, draws, goalsFavor, goalsOwn, totalGames };
}
