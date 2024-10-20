enum ENDPOINTS {
  ROOT = '/',
  LOCALES = '/locales',
  AUTH = '/auth',
  ADMIN = '/admin',
}

enum AUTH_ENDPOINTS {
  SIGN_IN = '/sign_in',
  SIGN_UP = '/sign_up',
}

enum USER_ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

enum USER_STATUS {
  BLOCKED = 'blocked',
  ACTIVE = 'active',
}

enum ERROR_MSGs {
  EMAIL_ALREADY_IN_USE = 'User with such an email already exists.',
  NO_SUCH_USER = 'User with such an email not found.',
  WRONG_PASSWORD = 'Wrong password.',
  USER_IS_BLOCKED = 'User with such an email is blocked.',
  NO_TOKEN = 'Request does not contain an authorization token.',
  INVALID_TOKEN = 'Invalid token.',
  NO_PASSWORD = 'No password provided.',
  NOT_ENOUGH_RIGHTS = 'Not enough rights! Only admin can manipulate with users and other admins.',
}

export { ENDPOINTS, USER_ROLES, USER_STATUS, AUTH_ENDPOINTS, ERROR_MSGs };
