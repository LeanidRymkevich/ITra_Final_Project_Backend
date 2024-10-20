import { DataTypes } from 'sequelize';

import { USER_ROLES, USER_STATUS } from '../../types/enums';
import db from '../db';

const User = db.define(
  'User',
  {
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
