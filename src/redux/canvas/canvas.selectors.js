import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectCanvas = ({ canvas }) => canvas;

export const selectLoading = createSelector(
  [selectCanvas],
  ({ loading }) => loading
);

export const selectOrderedColumnIds = createSelector(
  [selectCanvas],
  ({ orderedColumnIds }) => orderedColumnIds
);

export const selectMappedCards = createSelector(
  [selectCanvas],
  ({ mappedCards }) => mappedCards
);

export const selectMappedCardsByCardId = memoize((cardId) => {
  return createSelector(
    [selectMappedCards],
    (mappedCards) => mappedCards[cardId] || {}
  );
});

export const selectMappedColumnCardIds = createSelector(
  [selectCanvas],
  ({ mappedColumnCardIds }) => mappedColumnCardIds
);

export const selectMappedColumnCardIdsByColumnId = memoize((columnId) =>
  createSelector(
    [selectMappedColumnCardIds],
    (mappedColumnCardIds) => mappedColumnCardIds[columnId] || []
  )
);
