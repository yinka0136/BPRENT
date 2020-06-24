export const endpoints = {
  //Auth
  register: 'users/',
  googleLogin: 'social/google-oauth2',
  facebookLogin: 'social/facebook',

  //Email Confirmation
  sendEmailConfirmation: 'email_confirmation/send',
  readEmailConfirmationToken: 'email_confirmation',

  //Password Reset
  sendPasswordReset: 'password_reset/send',
  password_reset: 'password_reset',

  //Login
  token: 'token',
  refreshToken: 'token/referesh',

  //States
  stateList: 'states',
  stateRegions: 'states',

  //Users
  usersList: 'users',
  createUser: 'users',
  updateUsers: 'users',
  usersProfile: 'users/me',
  createAdmin: 'users/admin',
  updateAdmin: 'users/admin/',
  uploadAvatar: 'users/upload_avatar',
  adminUserCrud: 'users',
  passwordUpdate: 'users/password_update',

  //Categories
  getAllCategories: 'categories',
  createCategories: 'categories',
  getAllSubcategories: 'categories',
  createSubCategories: 'categories',
};
