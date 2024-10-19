enum ENDPOINTS {
  ROOT = '/',
  LOCALES = '/locales',
  AUTH = '/auth',
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

export { ENDPOINTS, USER_ROLES, USER_STATUS, AUTH_ENDPOINTS };
