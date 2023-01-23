import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    modelName: 'teams',
    underscored: true,
    timestamps: false,
    sequelize: db,
  },
);
