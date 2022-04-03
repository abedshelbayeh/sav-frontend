import PeopleActionTypes from "./people.types";

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
  filter: "",
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  modal: {
    visible: false,
  },
};

const peopleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PeopleActionTypes.FETCH_PEOPLE_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case PeopleActionTypes.FETCH_PEOPLE_SUCCESS: {
      const { data, pagination } = action.payload;
      return {
        ...state,
        loading: false,
        data,
        error: null,
        pagination,
      };
    }

    case PeopleActionTypes.FETCH_PEOPLE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case PeopleActionTypes.SET_PEOPLE_FILTER: {
      const { pagination } = state;
      return {
        ...state,
        filter: action.payload,
        pagination: {
          ...pagination,
          current: 1,
        },
      };
    }

    case PeopleActionTypes.TOGGLE_INVITE_PEOPLE: {
      const {
        modal: { visible },
      } = state;
      return {
        ...state,
        modal: {
          visible: !visible,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default peopleReducer;
