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
      text: [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
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

export const saveCard = (cardId) => {
  return async (_, getState) => {
    const { canvas: { boardId, mappedCards = {} } = {} } = getState();
    const { [cardId]: { cached } = {} } = mappedCards;

    update(ref(database), {
      [`/boards/${boardId}/mappedCards/${cardId}/text`]: cached,
    });
  };
};

export const updateCard = (cardId, text, selection) => {
  return {
    type: CanvasActionTypes.UPDATE_CACHED_CARD_TEXT,
    payload: {
      cardId,
      text,
      selection,
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

export const toggleCardsVisibility = () => {
  return async (_, getState) => {
    const { canvas: { boardId, settings: { cardsVisible } = {} } = {} } =
      getState();
    update(ref(database), {
      [`/boards/${boardId}/settings/cardsVisible`]: !cardsVisible,
    });
  };
};

export const toggleVotingAbility = () => {
  return async (_, getState) => {
    const { canvas: { boardId, settings: { votingEnabled } = {} } = {} } =
      getState();
    update(ref(database), {
      [`/boards/${boardId}/settings/votingEnabled`]: !votingEnabled,
    });
  };
};

export const toggleVotingVisibility = () => {
  return async (_, getState) => {
    const { canvas: { boardId, settings: { votesVisible } = {} } = {} } =
      getState();
    update(ref(database), {
      [`/boards/${boardId}/settings/votesVisible`]: !votesVisible,
    });
  };
};

export const togglePause = () => {
  return async (_, getState) => {
    const { canvas: { boardId, settings: { paused } = {} } = {} } = getState();
    update(ref(database), {
      [`/boards/${boardId}/settings/paused`]: !paused,
    });
  };
};

export const toggleTimer = () => {
  return async (_, getState) => {
    const { canvas: { boardId, settings: { timer } = {} } = {} } = getState();
    update(ref(database), {
      [`/boards/${boardId}/settings/timer`]: !!timer
        ? false
        : {
            running: false,
            time: 300 * 1000,
            pause: 300 * 1000,
            deadline: null,
          },
    });
  };
};

export const setTime = (ms) => {
  return async (_, getState) => {
    const {
      canvas: { boardId },
    } = getState();
    update(ref(database), {
      [`/boards/${boardId}/settings/timer/time`]: ms,
      [`/boards/${boardId}/settings/timer/pause`]: ms,
      [`/boards/${boardId}/settings/timer/deadline`]: null,
    });
  };
};

export const startTimer = () => {
  return async (_, getState) => {
    const {
      canvas: {
        boardId,
        settings: {
          timer: { pause },
        },
      },
    } = getState();

    let deadline = new Date();
    deadline.setMilliseconds(deadline.getMilliseconds() + pause);

    update(ref(database), {
      [`/boards/${boardId}/settings/timer/running`]: true,
      [`/boards/${boardId}/settings/timer/pause`]: null,
      [`/boards/${boardId}/settings/timer/deadline`]: deadline
        ? Date.parse(deadline)
        : null,
    });
  };
};

export const pauseTimer = (ms) => {
  return async (_, getState) => {
    const {
      canvas: { boardId },
    } = getState();
    update(ref(database), {
      [`/boards/${boardId}/settings/timer/running`]: false,
      [`/boards/${boardId}/settings/timer/pause`]: ms,
      [`/boards/${boardId}/settings/timer/deadline`]: null,
    });
  };
};

export const addTime = (ms) => {
  return async (_, getState) => {
    const {
      canvas: {
        boardId,
        settings: {
          timer: { running },
        },
      },
    } = getState();

    let pause = ms;
    let deadline = null;

    if (running) {
      pause = null;
      deadline = new Date();
      deadline.setMilliseconds(deadline.getMilliseconds() + ms);
    }

    update(ref(database), {
      [`/boards/${boardId}/settings/timer/time`]: ms,
      [`/boards/${boardId}/settings/timer/pause`]: pause,
      [`/boards/${boardId}/settings/timer/deadline`]: deadline
        ? Date.parse(deadline)
        : null,
    });
  };
};
