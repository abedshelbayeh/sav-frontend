import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  loading: true,
  user: null,
  theme: "system",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.AUTHENTICATION_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case UserActionTypes.SET_USER: {
      const { user, theme } = action.payload;
      return {
        ...state,
        loading: false,
        user,
        theme,
      };
    }

    case UserActionTypes.SET_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
