export const TOKEN = "token";
export const GOOGLE_TOKEN = "GOOGLE_TOKEN";


// Original token
export const saveUserToken = (token:string) => {
  return localStorage.setItem(TOKEN,token)
};
export const getUserToken = () => {
  return localStorage.getItem(TOKEN)
};

export const removeUserToken = () => {
  return localStorage.removeItem(TOKEN)
};

export const saveUserGoogleToken = (token: string) =>
  localStorage.setItem(GOOGLE_TOKEN, token);

export const getUserGoogleToken = () =>
  localStorage.getItem(GOOGLE_TOKEN);