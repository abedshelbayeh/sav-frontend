import service from "../../interfaces/service";
import PeopleActionTypes from "./people.types";

export const fetchPeopleStart = (paginated) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PeopleActionTypes.FETCH_PEOPLE_START });

      const {
        people: { pagination, filter },
      } = getState();
      const { current, pageSize } = paginated || pagination;

      const { data: { rows = [], count } = {} } = await service(
        "get",
        `/v1/people/list?filter=${filter}&limit=${pageSize}&skip=${
          current * pageSize - pageSize
        }`
      );
      dispatch({
        type: PeopleActionTypes.FETCH_PEOPLE_SUCCESS,
        payload: {
          data: rows,
          pagination: {
            current,
            pageSize,
            total: count,
          },
        },
      });
    } catch (error) {
      dispatch({
        type: PeopleActionTypes.FETCH_PEOPLE_ERROR,
        payload: error.message,
      });
    }
  };
};

export const setFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: PeopleActionTypes.SET_PEOPLE_FILTER,
      payload: filter,
    });
    dispatch(fetchPeopleStart());
  };
};

export const toggleInvitePeople = () => {
  return {
    type: PeopleActionTypes.TOGGLE_INVITE_PEOPLE,
  };
};

export const resetPeople = () => {
  return { type: PeopleActionTypes.RESET_PEOPLE };
};
