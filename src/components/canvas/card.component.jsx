import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import deepEqual from "fast-deep-equal";
import { Draggable } from "react-beautiful-dnd";

// components
import Textarea from "../card/textarea.component";

// styles
import * as Styled from "./canvas.styles";

// actions
import {
  removeCard,
  saveCard,
  toggleLike,
  updateCard,
} from "../../redux/canvas/canvas.actions";

// selectors
import { selectMappedCardsByCardId } from "../../redux/canvas/canvas.selectors";

const Card = ({ cardId, index }) => {
  const dispatch = useDispatch();

  const {
    createdBy,
    likes = {},
    cached,
    selection,
    text,
    columnId,
  } = useSelector(selectMappedCardsByCardId(cardId), deepEqual);
  const uid = useSelector(({ user: { user: { uid } = {} } = {} }) => uid);
  const { cardsVisible, votesVisible, votingEnabled, paused } = useSelector(
    ({ canvas: { settings } }) => settings
  );

  const isCardOwnedByUser = createdBy === uid;
  const hasUserLikedCard = likes[uid];
  const canUserLike = !isCardOwnedByUser && votingEnabled && !paused;
  const isCardDisabled = !isCardOwnedByUser || paused;
  const isCardBlurred = !isCardOwnedByUser && !cardsVisible;

  return (
    <Draggable
      draggableId={cardId}
      index={index}
      isDragDisabled={isCardDisabled}
    >
      {(provided, { isDragging }) => (
        <Styled.Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={isDragging}
          isCardOwnedByUser={isCardOwnedByUser}
          className={isCardBlurred && "blurred"}
        >
          <Textarea
            autoSave={true}
            localValue={cached}
            cloudValue={text}
            selection={selection}
            disabled={isCardDisabled}
            onChange={({ value, selection }) => {
              dispatch(updateCard(cardId, value, selection));
            }}
            onSave={() => {
              dispatch(saveCard(cardId));
            }}
          />
          <Styled.Extra>
            {isCardOwnedByUser && (
              <Styled.Remove
                onClick={
                  !paused ? () => dispatch(removeCard(columnId, cardId)) : null
                }
              />
            )}
            <Styled.Like
              onClick={() => canUserLike && dispatch(toggleLike(cardId))}
              icon={hasUserLikedCard ? <Styled.Liked /> : <Styled.Unliked />}
              style={{
                cursor: canUserLike ? "pointer" : "unset",
              }}
            >
              {votesVisible && (
                <Styled.Likes>{Object.keys(likes).length}</Styled.Likes>
              )}
            </Styled.Like>
          </Styled.Extra>
        </Styled.Card>
      )}
    </Draggable>
  );
};

export default memo(Card);
