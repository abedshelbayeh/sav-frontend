import UserActionTypes from "./user.types";

export const authenticationStart = () => {
  return { type: UserActionTypes.AUTHENTICATION_START };
};

export const setUser = (user) => {
  return { type: UserActionTypes.SET_USER, payload: user };
};
