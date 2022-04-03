import CanvasActionTypes from "./canvas.types";

const INITIAL_STATE = {
  boardId: null,
  loading: false,
  orderedColumnIds: [],
  mappedCards: {},
  mappedColumnCardIds: {},
  subscription: null,
  error: null,
};

const canvasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CanvasActionTypes.FETCH_CARDS_START: {
      const { boardId, orderedColumnIds } = action.payload;
      return {
        ...state,
        boardId,
        orderedColumnIds,
        loading: true,
      };
    }

    case CanvasActionTypes.SUBSCRIBE: {
      return {
        ...state,
        subscription: action.payload,
      };
    }

    case CanvasActionTypes.FETCH_CARDS_SUCCESS: {
      const {
        mappedCards: cachedMappedCards = {},
        orderedColumnIds: cachedOrderedColumnIds = [],
      } = state;

      const {
        mappedCards = {},
        mappedColumnCardIds = {},
        orderedColumnIds,
      } = action.payload;

      return {
        ...state,
        mappedCards: Object.keys(mappedCards).reduce((a, mappedCardId) => {
          const mappedCard = mappedCards[mappedCardId];
          const { cached } = cachedMappedCards[mappedCardId] || {};
          return {
            ...a,
            [mappedCardId]: {
              ...mappedCard,
              cached,
            },
          };
        }, {}),
        mappedColumnCardIds,
        orderedColumnIds: orderedColumnIds || cachedOrderedColumnIds,
        loading: false,
      };
    }

    case CanvasActionTypes.FETCH_CARDS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case CanvasActionTypes.UPDATE_CACHED_CARD_TEXT: {
      const { cardId, text } = action.payload;
      const { mappedCards } = state;

      return {
        ...state,
        mappedCards: {
          ...mappedCards,
          [cardId]: {
            ...mappedCards[cardId],
            cached: text,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default canvasReducer;
