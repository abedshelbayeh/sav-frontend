import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import deepEqual from "fast-deep-equal";
import { Draggable } from "react-beautiful-dnd";

// components
import Textarea from "../card/textarea.component";

// styles
import { DeleteTwoTone } from "@ant-design/icons";
import { DANGER_COLOR } from "../../style-variables";
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

  const isCardOwnedByUser = createdBy === uid;
  const hasUserLikedCard = likes[uid];

  return (
    <Draggable
      draggableId={cardId}
      index={index}
      isDragDisabled={!isCardOwnedByUser}
    >
      {(provided, { isDragging }) => (
        <Styled.Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={isDragging}
          isCardOwnedByUser={isCardOwnedByUser}
        >
          <Textarea
            autoSave={true}
            localValue={cached}
            cloudValue={text}
            selection={selection}
            onChange={({ value, selection }) => {
              dispatch(updateCard(cardId, value, selection));
            }}
            onSave={() => {
              dispatch(saveCard(cardId));
            }}
            disabled={!isCardOwnedByUser}
          />
          <Styled.Extra>
            {isCardOwnedByUser && (
              <DeleteTwoTone
                twoToneColor={DANGER_COLOR}
                onClick={() => dispatch(removeCard(columnId, cardId))}
              />
            )}
            <Styled.Like
              {...(!isCardOwnedByUser
                ? { onClick: () => dispatch(toggleLike(cardId)) }
                : {})}
              icon={hasUserLikedCard ? <Styled.Liked /> : <Styled.Unliked />}
              style={{ cursor: isCardOwnedByUser ? "unset" : "pointer" }}
            >
              {Object.keys(likes).length}
            </Styled.Like>
          </Styled.Extra>
        </Styled.Card>
      )}
    </Draggable>
  );
};

export default memo(Card);
