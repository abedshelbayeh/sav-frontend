import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  loading: true,
  user: null,
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
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
