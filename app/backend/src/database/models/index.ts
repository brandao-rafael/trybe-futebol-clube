import { Sequelize } from 'sequelize';
import * as config from '../config/database';
import Users from './users.model';

const sequelize = new Sequelize(config)

export default sequelize;
export { Users }
