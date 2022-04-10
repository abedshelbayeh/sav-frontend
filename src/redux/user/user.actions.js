import UserActionTypes from "./user.types";

export const authenticationStart = () => {
  return { type: UserActionTypes.AUTHENTICATION_START };
};

export const setUser = (user) => {
  const theme = localStorage.getItem("sav-theme") || "light";
  return { type: UserActionTypes.SET_USER, payload: { user, theme } };
};

export const setTheme = (theme) => {
  localStorage.setItem("sav-theme", theme);
  return { type: UserActionTypes.SET_THEME, payload: theme };
};
