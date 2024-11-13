const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/`

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "sendotp",
  SIGNUP_API: BASE_URL + "signup",
  LOGIN_API: BASE_URL + "login",
  GET_PROFILE: BASE_URL + "me",
  LOGOUT_API: BASE_URL + "logout",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "updateDisplayPicture",
  REMOVE_PROFILE_PICTURE_API: BASE_URL + "removeProfilePicture",
  SET_PREFERED_COUNTRY: BASE_URL + "setPreferedCountry",
  CHANGE_PASSWORD_API: BASE_URL + "changePassword",
  DELETE_PROFILE_API: BASE_URL + "deleteProfile",
  RESETPASSTOKEN_API: BASE_URL + "reset-password-token",
  RESETPASSWORD_API: BASE_URL + "reset-password",
  ADD_TO_BOOKMARKS_API: BASE_URL + "addToBookmarks",
  REMOVE_FROM_BOOKMARKS_API: BASE_URL + "removeFromBookmarks",
  FETCH_BOOKMARKS_API: BASE_URL + "fetchBookmarks"
}