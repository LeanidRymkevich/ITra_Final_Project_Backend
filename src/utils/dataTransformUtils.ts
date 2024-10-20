import User from '../db/models/User';

const delPasswordField = (
  user: User
): Pick<User, 'id' | 'username' | 'email' | 'role' | 'status'> => {
  const { id, username, email, role, status } = user;
  return { id, username, email, role, status };
};

export { delPasswordField };
