export const endpoints = {
  //Auth
  register: 'users/register',
  googleLogin: 'social/google-oauth2',
  facebookLogin: 'social/facebook',

  //Email Confirmation
  resendEmailConfirmation: 'users/send_email_confirmation',
  confirmEmail: 'users',

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
  updateUsers: 'users/update',
  usersProfile: 'users/me',
  createAdmin: 'users/create_admin',
  updateAdmin: 'users/admin/',
  uploadAvatar: 'users/upload_avatar',
  adminUserCrud: 'users',
  passwordUpdate: 'users/update_password',

  //Categories
  getAllCategories: 'category/all',
  createCategory: 'category/create',
  getAllCategoriesWithSub: 'category/sub_categories',

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
  findAllExpiredAds: 'ads/all_expired',
  findAllDisabledAds: 'ads/all_disabled',
  findAllDeclinedAds: 'ads/all_declined',
  findAllClosedAds: 'ads/all_closed',
  findAllApprovedAds: 'ads/all_approved',
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
  deleteAdImage: 'ads/image',
  search: 'ads/search',
  searchBySubcategory: 'sub_category',
  //Coins
  buyCoins: 'coins/buy',
  allTransactios: 'coins/transactions',
  myTransactions: 'coins/my_transactions',
  //FeedBack
  deleteFeedBack: 'feedbacks',
  updateFeedBack: 'feedbacks',
  getAllFeedBacks: 'feedbacks/all',
  getAllSentFeedBacks: 'feedbacks/sent',
  getAllRecievedFeedBacks: 'feedbacks/received',
  createFeedBack: 'feedbacks',
  getUserFeedBack: 'feedbacks',
  //Message
  deleteMessage: 'messages',
  getAllMessages: 'messages/all',
  getAllSentMessages: 'messages/sent',
  getAllRecievedMessages: 'messages/received',
  createMessage: 'messages',
  getMessage: 'messages',
  //Report
  deletereport: 'reports',
  getAllreports: 'reports/all',
  getAllSentreports: 'reports/sent',
  createreport: 'reports',
  getreportByAd: 'reports',
};
