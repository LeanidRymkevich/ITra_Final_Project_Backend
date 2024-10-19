import { DataTypes } from 'sequelize';

import { USER_ROLES, USER_STATUS } from '../../types/enums';
import db from '../db';

const User = db.define('User', {
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
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: USER_ROLES.USER,
    validate: {
      notEmpty: true,
      isIn: [[USER_ROLES.ADMIN, USER_ROLES.USER]],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: USER_STATUS.ACTIVE,
    validate: {
      notEmpty: true,
      isIn: [[USER_STATUS.ACTIVE, USER_STATUS.BLOCKED]],
    },
  },
});

export default User;
