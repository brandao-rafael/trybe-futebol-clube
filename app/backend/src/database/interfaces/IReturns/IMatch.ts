type teamName = {
  teamName: string
};

export default interface IMatch {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeamId: number,
  awayTeamId: number,
  homeTeam: teamName,
  awayTeam: teamName,
}
