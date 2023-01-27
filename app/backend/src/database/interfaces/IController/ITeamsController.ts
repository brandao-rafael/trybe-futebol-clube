import { Request, Response } from 'express';

export default interface ITeamsController {
  getAll(_req: Request, res: Response):Promise<void | Response>;

  getById(req: Request, res: Response):Promise<void | Response>;
}
