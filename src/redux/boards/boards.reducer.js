import BoardsActionTypes from "./boards.types";

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
    loading: false,
    visible: false,
    boardId: null,
    board: {},
    templates: [],
    people: [],
    saving: false,
  },
};

const boardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BoardsActionTypes.FETCH_BOARDS_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case BoardsActionTypes.FETCH_BOARDS_SUCCESS: {
      const { data, pagination } = action.payload;
      return {
        ...state,
        loading: false,
        data,
        error: null,
        pagination,
      };
    }

    case BoardsActionTypes.FETCH_BOARDS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case BoardsActionTypes.SET_BOARDS_FILTER: {
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

    case BoardsActionTypes.TOGGLE_EDIT_BOARD: {
      const { modal } = state;
      return {
        ...state,
        modal: {
          ...modal,
          visible: !modal.visible,
          boardId: action.payload,
        },
      };
    }

    case BoardsActionTypes.FETCH_BOARD_START: {
      const { modal } = state;
      return {
        ...state,
        modal: {
          ...modal,
          loading: true,
        },
      };
    }

    case BoardsActionTypes.FETCH_BOARD_SUCCESS: {
      const { modal } = state;
      const {
        boardId,
        board = {},
        templates = [],
        people = [],
      } = action.payload;
      return {
        ...state,
        modal: {
          ...modal,
          loading: false,
          boardId,
          board,
          templates,
          people,
        },
      };
    }

    case BoardsActionTypes.FETCH_BOARD_ERROR: {
      const { modal } = state;
      return {
        ...state,
        modal: {
          ...modal,
          loading: false,
          error: action.payload,
        },
      };
    }

    case BoardsActionTypes.EDIT_BOARD_START: {
      const { modal } = state;
      return {
        ...state,
        modal: {
          ...modal,
          saving: true,
        },
      };
    }

    case BoardsActionTypes.EDIT_BOARD_SUCCESS: {
      const { modal } = state;
      return {
        ...state,
        modal: {
          ...modal,
          visible: false,
          saving: false,
          boardId: null,
          board: {},
          templates: [],
          people: [],
        },
      };
    }

    case BoardsActionTypes.EDIT_BOARD_ERROR: {
      const { modal } = state;
      return {
        ...state,
        modal: {
          ...modal,
          saving: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default boardsReducer;
