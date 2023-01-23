import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const ValidateLogin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(user);
  if (error) return res.status(400).json({ message: 'All fields must be filled' });

  next();
};

export default ValidateLogin;
