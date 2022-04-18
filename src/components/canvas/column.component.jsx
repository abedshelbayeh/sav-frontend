import { memo } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import deepEqual from "fast-deep-equal";

// components
import Card from "./card.component";

// styles
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faGripLinesVertical,
} from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./canvas.styles";

// actions
import { addCard } from "../../redux/canvas/canvas.actions";

// selectors
import { selectMappedColumnCardIdsByColumnId } from "../../redux/canvas/canvas.selectors";

const Column = ({ title, index }) => {
  const dispatch = useDispatch();

  const cardIds = useSelector(
    selectMappedColumnCardIdsByColumnId(title),
    deepEqual
  );
  const { paused } = useSelector(({ canvas: { settings } }) => settings);

  return (
    <Draggable draggableId={title} index={index} isDragDisabled={paused}>
      {(provided, { isDragging }) => (
        <Styled.Column
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={isDragging}
        >
          <Styled.Header {...provided.dragHandleProps} isDragging={isDragging}>
            <Styled.Title>
              <Icon icon={faGripLinesVertical} />
              {title.toUpperCase()}
            </Styled.Title>
            <Styled.AddCard
              icon={faCirclePlus}
              onClick={!paused ? () => dispatch(addCard(title)) : null}
            />
          </Styled.Header>
          <Droppable droppableId={title} type="CARD">
            {(provided, { isDraggingOver }) => (
              <Styled.Cards
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={isDraggingOver}
              >
                {cardIds.length > 0 &&
                  cardIds.map((cardId, index) => (
                    <Card key={cardId} cardId={cardId} index={index} />
                  ))}
                {cardIds.length <= 0 && (
                  <Styled.Empty>
                    Click the <Icon icon={faCirclePlus} /> icon on the top right
                    corner to add a new card.
                  </Styled.Empty>
                )}
                {provided.placeholder}
              </Styled.Cards>
            )}
          </Droppable>
        </Styled.Column>
      )}
    </Draggable>
  );
};

export default memo(Column);
