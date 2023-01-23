import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JET_SECRET || 'jwt_secret';

const validateToken = (token: string) => {
  const tokenVerified = jwt.verify(token, JWT_SECRET);
  console.log(tokenVerified);
};

export default validateToken;
