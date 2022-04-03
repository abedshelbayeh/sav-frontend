import { get, ref, update } from "firebase/database";
import { database } from "../../interfaces/firebase";
import service from "../../interfaces/service";
import notify from "../../utils/notification.util";
import BoardsActionTypes from "./boards.types";

const equalColumns = (cloudColumns = [], localColumns = "") => {
  return (
    localColumns.split(",").sort().join(",") ===
    cloudColumns
      .filter((columnId) => columnId !== "OTHER")
      .sort()
      .join(",")
  );
};

const synchronizeBoardColumns = async (boardId, templateId) => {
  const [snapshot, { data: { rows } = {} } = {}] = await Promise.all([
    get(ref(database, `/boards/${boardId}`)),
    service("get", `/v1/boards/templates/${templateId}`),
  ]);

  const {
    mappedCards = {},
    mappedColumnCardIds = {},
    orderedColumnIds = [],
  } = snapshot.val() || {};
  const [{ columns } = {}] = rows || [];

  if (!columns || equalColumns(orderedColumnIds, columns)) {
    return;
  }

  const templateColumnIds = columns
    .split(",")
    .reduce((a, columnId) => ({ ...a, [columnId]: true }), {});

  const reorganizedMappedCards = Object.keys(mappedCards).reduce(
    (a, mappedCardId) => {
      const mappedCard = mappedCards[mappedCardId];
      if (!templateColumnIds[mappedCard.clumnId]) {
        return {
          ...a,
          [mappedCardId]: {
            ...mappedCard,
            columnId: "OTHER",
          },
        };
      }
      return {
        ...a,
        [mappedCardId]: mappedCard,
      };
    },
    {}
  );

  const reorganizedMappedColumnCardIds = Object.keys(
    mappedColumnCardIds
  ).reduce((a, columnId) => {
    const columnCardIds = mappedColumnCardIds[columnId];
    const { OTHER = [] } = a;
    if (!templateColumnIds[columnId]) {
      return {
        ...a,
        OTHER: [...OTHER, ...columnCardIds],
      };
    }
    return {
      ...a,
      [columnId]: columnCardIds,
    };
  }, {});

  const reorganizedOrderedColumnIds = columns.split(",");
  if (reorganizedMappedColumnCardIds.OTHER) {
    reorganizedOrderedColumnIds.push("OTHER");
  }

  update(ref(database), {
    [`/boards/${boardId}/mappedCards`]: reorganizedMappedCards,
    [`/boards/${boardId}/mappedColumnCardIds`]: reorganizedMappedColumnCardIds,
    [`/boards/${boardId}/orderedColumnIds`]: reorganizedOrderedColumnIds,
  });
};

export const fetchBoardsStart = (paginated) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: BoardsActionTypes.FETCH_BOARDS_START });

      const {
        boards: { pagination, filter },
      } = getState();

      const { current, pageSize } = paginated || pagination;

      const { data: { rows = [], count } = {} } = await service(
        "get",
        `/v1/boards/list?filter=${filter}&limit=${pageSize}&skip=${
          current * pageSize - pageSize
        }`
      );

      dispatch({
        type: BoardsActionTypes.FETCH_BOARDS_SUCCESS,
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
        type: BoardsActionTypes.FETCH_BOARDS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const setFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: BoardsActionTypes.SET_BOARDS_FILTER,
      payload: filter,
    });
    dispatch(fetchBoardsStart());
  };
};

export const toggleEditBoard = (boardId) => {
  return { type: BoardsActionTypes.TOGGLE_EDIT_BOARD, payload: boardId };
};

export const fetchBoardStart = (boardId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: BoardsActionTypes.FETCH_BOARD_START });

      const [
        { data: { rows: boardRows = [] } = {} },
        { data: { rows: templateRows = [] } = {} },
        { data: { rows: peopleRows = [] } = {} },
      ] = await Promise.all([
        boardId ? service("get", `/v1/boards/${boardId}`) : {},
        service("get", `/v1/boards/templates/list`),
        service("get", `/v1/people/list`),
      ]);

      const board = boardRows.reduce(
        (a, { id, templateId, userId }) => {
          let { participants } = a;
          if (userId) {
            participants[userId] = true;
          }
          return {
            id,
            templateId,
            participants,
          };
        },
        { participants: {} }
      );

      const { templateId: selectedTemplateId } = board;
      const templates = templateRows.sort(({ id }, b) =>
        id === selectedTemplateId ? -1 : 1
      );

      const people = peopleRows.reduce(
        (a, row) => ({ ...a, [row.id]: row }),
        {}
      );

      dispatch({
        type: BoardsActionTypes.FETCH_BOARD_SUCCESS,
        payload: {
          boardId,
          board,
          templates,
          people,
        },
      });
    } catch (error) {
      dispatch({
        type: BoardsActionTypes.FETCH_BOARD_ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteBoard = (boardId, after) => {
  return async (dispatch) => {
    try {
      dispatch({ type: BoardsActionTypes.EDIT_BOARD_START });

      await update(ref(database), {
        [`/boards/${boardId}`]: null,
      });
      await service("delete", `/v1/boards/${boardId}`);

      dispatch({ type: BoardsActionTypes.EDIT_BOARD_SUCCESS });
      dispatch(fetchBoardsStart());

      if (typeof after === "function") {
        after();
      }

      notify("success", "Success!", "Your board was deleted.");
    } catch (error) {
      notify(
        "error",
        "Uh oh!",
        "Something went wrong. Try again in a minute. If the issue persists, please contact support for assistance."
      );
    }
  };
};

export const editBoard = (boardId, values, after) => {
  return async (dispatch) => {
    try {
      dispatch({ type: BoardsActionTypes.EDIT_BOARD_START });

      const { data: { rows = [] } = {} } = await service("post", `/v1/boards`, {
        ...values,
        id: boardId,
      });

      if (boardId) {
        await synchronizeBoardColumns(boardId, values.templateId);
      }

      const [{ id } = {}] = rows;
      if (typeof after === "function") {
        after(id);
      }

      dispatch({ type: BoardsActionTypes.EDIT_BOARD_SUCCESS });
      dispatch(fetchBoardsStart());

      notify("success", "Success", "Your board was saved.");
    } catch (error) {
      dispatch({ type: BoardsActionTypes.EDIT_BOARD_ERROR });
      notify(
        "error",
        "Uh oh!",
        "Something went wrong. Try again in a minute. If the issue persists, please contact support for assistance."
      );
    }
  };
};
