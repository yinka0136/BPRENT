export const endpoints = {
  //Auth
  register: 'users/register',
  googleLogin: 'social/google-oauth2',
  facebookLogin: 'social/facebook',

  //Email Confirmation
  resendEmailConfirmation: 'users/send_email_confirmation',
  confirmEmail: 'users/confirm_email',

  //Password Reset
  sendPasswordReset: 'users/send_password_reset',
  password_reset: 'users/password_reset',

  //Login
  login: 'login',
  refreshToken: 'token/referesh/',

  //States
  fetchAllStates: 'states/all',
  fetchRegions: 'states',

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
  getAllCategories: 'category/all',
  createCategory: 'category/create',

  getCategory: 'category/find',
  updateCategory: 'category',
  deleteCategory: 'category',
  //Subcategories
  getAllSubcategories: 'sub_category',
  createSubCategory: 'sub_category',
  deleteSubcategory: 'sub_category',
  updateSubcategory: 'sub_category',
  getOneSubcategory: 'sub_category',
  //Ads
  createAd: 'ads/create',
  findAllAds: 'ads/all',
  myAds: 'ads/my_ads',
  savedAds: 'ads/saved',
  findOneAd: 'ads',
  findAllActiveAds: 'ads/all_active',
  findAllPendingAds: 'ads/all_pending',
  updateAd: 'ads',
  approveAd: 'ads',
  boostAd: 'ads',
  toggleSaveAd: 'ads',
  toggleDisabledAd: 'ads',
  repostAd: 'ads',
  declineAd: 'ads',
  cancelAd: 'ads',
  deleteAd: 'ads',
  newAds: 'ads/new',
  trendingAds: 'ads/trending',
  //Coins
  buyCoins: 'coins/buy',
  allTransactios: 'coins/transactions',
  myTransactions: 'coins/my_transactions',
};
