import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import Users from '../models/users.model';

export default class userService {
  public static async login(email: string, password: string):Promise<string | null> {
    const userByEmail = await Users.findOne({ where: { email } });

    if (!userByEmail) return null;
    if (!compareSync(password, userByEmail.dataValues.password)) return null;

    const token = sign({ id: userByEmail.id }, 'jwt_secret', { expiresIn: '1d' });
    return token;
  }
}
