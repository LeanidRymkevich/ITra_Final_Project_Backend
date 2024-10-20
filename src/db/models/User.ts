import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { USER_ROLES, USER_STATUS } from '../../types/enums';
import db from '../db';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: CreationOptional<USER_ROLES>;
  declare status: CreationOptional<USER_STATUS>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM(USER_ROLES.ADMIN, USER_ROLES.USER),
      allowNull: false,
      defaultValue: USER_ROLES.USER,
    },
    status: {
      type: DataTypes.ENUM(USER_STATUS.ACTIVE, USER_STATUS.BLOCKED),
      allowNull: false,
      defaultValue: USER_STATUS.ACTIVE,
    },
  },
  {
    sequelize: db,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
    timestamps: false,
  }
);

export default User;
