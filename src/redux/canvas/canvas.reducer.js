import CanvasActionTypes from "./canvas.types";

const INITIAL_STATE = {
  boardId: null,
  loading: false,
  orderedColumnIds: [],
  mappedCards: {},
  mappedColumnCardIds: {},
  settings: {
    cardsVisible: false,
    votingEnabled: true,
    votesVisible: true,
    paused: false,
  },
  subscription: null,
  error: null,
};

const canvasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CanvasActionTypes.FETCH_CARDS_START: {
      const { boardId, orderedColumnIds } = action.payload;
      return {
        ...INITIAL_STATE,
        boardId,
        loading: true,
        orderedColumnIds,
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
        settings: cachedSettings = {},
      } = state;

      const {
        mappedCards = {},
        mappedColumnCardIds = {},
        orderedColumnIds,
        settings = {},
      } = action.payload;

      return {
        ...state,
        mappedCards: Object.keys(mappedCards).reduce((a, mappedCardId) => {
          const mappedCard = mappedCards[mappedCardId];
          const { cached, selection } = cachedMappedCards[mappedCardId] || {};
          return {
            ...a,
            [mappedCardId]: {
              ...mappedCard,
              cached,
              selection,
            },
          };
        }, {}),
        mappedColumnCardIds,
        orderedColumnIds: orderedColumnIds || cachedOrderedColumnIds,
        settings: {
          ...cachedSettings,
          ...settings,
        },
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
      const { cardId, text, selection } = action.payload;
      const { mappedCards } = state;

      return {
        ...state,
        mappedCards: {
          ...mappedCards,
          [cardId]: {
            ...mappedCards[cardId],
            cached: text,
            selection,
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
