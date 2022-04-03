import CanvasActionTypes from "./canvas.types";
import { database } from "../../interfaces/firebase";
import { ref, onValue, update } from "firebase/database";
import { v4 as uuid } from "uuid";

export const fetchCardsStart = (boardId, columns) => {
  return async (dispatch, getState) => {
    try {
      const {
        canvas: { subscription: unsubscribe },
      } = getState();

      // if user's already subscribed to some board, unsubscribe them first
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }

      dispatch({
        type: CanvasActionTypes.FETCH_CARDS_START,
        payload: { boardId, orderedColumnIds: columns.split(",") },
      });

      const boardRef = ref(database, `/boards/${boardId}`);
      const subscription = onValue(boardRef, (snapshot) => {
        const board = snapshot.val() || {};
        dispatch({
          type: CanvasActionTypes.FETCH_CARDS_SUCCESS,
          payload: board,
        });
      });

      dispatch({ type: CanvasActionTypes.SUBSCRIBE, payload: subscription });
    } catch (error) {
      dispatch({
        type: CanvasActionTypes.FETCH_CARDS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const addCard = (columnId) => {
  return async (_, getState) => {
    const {
      canvas: {
        boardId,
        mappedColumnCardIds: { [columnId]: columnCardIds = [] } = {},
      } = {},
      user: { user: { uid } = {} },
    } = getState();

    const card = {
      id: uuid(),
      columnId,
      text: "",
      likes: {},
      createdBy: uid,
    };

    update(ref(database), {
      [`/boards/${boardId}/mappedCards/${card.id}`]: card,
      [`/boards/${boardId}/mappedColumnCardIds/${columnId}`]: [
        card.id,
        ...columnCardIds,
      ],
    });
  };
};

export const removeCard = (columnId, cardId) => {
  return async (_, getState) => {
    const {
      canvas: {
        boardId,
        mappedColumnCardIds: { [columnId]: columnCardIds = [] } = {},
        orderedColumnIds,
      } = {},
    } = getState();

    const updates = {
      [`/boards/${boardId}/mappedCards/${cardId}`]: null,
    };

    let filteredColumnCardIds = columnCardIds.filter((id) => id !== cardId);
    if (columnId === "OTHER" && !filteredColumnCardIds.length) {
      filteredColumnCardIds = null;
      updates[`/boards/${boardId}/orderedColumnIds`] = orderedColumnIds.filter(
        (columnId) => columnId !== "OTHER"
      );
    }

    updates[`/boards/${boardId}/mappedColumnCardIds/${columnId}`] =
      filteredColumnCardIds;

    update(ref(database), updates);
  };
};

export const moveColumn = (source, destination, columnId) => {
  return async (_, getState) => {
    const { canvas: { boardId, orderedColumnIds = [] } = {} } = getState();

    orderedColumnIds.splice(source.index, 1);
    orderedColumnIds.splice(destination.index, 0, columnId);

    update(ref(database), {
      [`/boards/${boardId}/orderedColumnIds`]: orderedColumnIds,
    });
  };
};

export const moveCard = (source, destination, cardId) => {
  return async (_, getState) => {
    const {
      canvas: { boardId, mappedColumnCardIds = {}, orderedColumnIds = [] } = {},
    } = getState();

    const updates = {
      [`/boards/${boardId}/mappedCards/${cardId}/columnId`]:
        destination.droppableId,
    };

    let { [source.droppableId]: sourceCardIds = [] } = mappedColumnCardIds;
    sourceCardIds.splice(source.index, 1);

    if (source.droppableId === "OTHER" && !sourceCardIds.length) {
      sourceCardIds = null;
      updates[`/boards/${boardId}/orderedColumnIds`] = orderedColumnIds.filter(
        (columnId) => columnId !== "OTHER"
      );
    }

    updates[`/boards/${boardId}/mappedColumnCardIds/${source.droppableId}`] =
      sourceCardIds;

    const { [destination.droppableId]: destinationCardIds = [] } =
      mappedColumnCardIds;
    destinationCardIds.splice(destination.index, 0, cardId);

    updates[
      `/boards/${boardId}/mappedColumnCardIds/${destination.droppableId}`
    ] = destinationCardIds;

    update(ref(database), updates);
  };
};

export const saveCard = (cardId, text) => {
  return async (dispatch, getState) => {
    const { canvas: { boardId } = {} } = getState();

    dispatch({
      type: CanvasActionTypes.UPDATE_CACHED_CARD_TEXT,
      payload: {
        cardId,
        text: null,
      },
    });

    update(ref(database), {
      [`/boards/${boardId}/mappedCards/${cardId}/text`]: text,
    });
  };
};

export const updateCard = (cardId, text) => {
  return {
    type: CanvasActionTypes.UPDATE_CACHED_CARD_TEXT,
    payload: {
      cardId,
      text,
    },
  };
};

export const toggleLike = (cardId) => {
  return async (dispatch, getState) => {
    const {
      canvas: {
        boardId,
        mappedCards: { [cardId]: { likes = {} } = {} } = {},
      } = {},
      user: { user: { uid } = {} } = {},
    } = getState();

    update(ref(database), {
      [`/boards/${boardId}/mappedCards/${cardId}/likes/${uid}`]: likes[uid]
        ? null
        : true,
    });
  };
};
