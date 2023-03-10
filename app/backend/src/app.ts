import * as express from 'express';
import MatchesRouter from './database/routes/Matches.routes';
import TeamsRouter from './database/routes/Teams.routes';
import UserRouter from './database/routes/User.routes';
import LeaderboardRouter from './database/routes/Leaderboard.routes';

const userRouter = new UserRouter();
const teamRouter = new TeamsRouter();
const matchRouter = new MatchesRouter();
const leaderboardRouter = new LeaderboardRouter();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use('/login', userRouter.router);
    this.app.use('/teams', teamRouter.router);
    this.app.use('/matches', matchRouter.router);
    this.app.use('/leaderboard', leaderboardRouter.router);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
