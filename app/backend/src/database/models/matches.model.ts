import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teams.model';

export default class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: Teams,
        key: 'id',
      },
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: Teams,
        key: 'id',
      },
    },
  },
  {
    tableName: 'matches',
    underscored: true,
    timestamps: false,
    sequelize: db,
  },

);

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });
