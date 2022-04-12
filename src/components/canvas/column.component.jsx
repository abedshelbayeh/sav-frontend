import { memo } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import deepEqual from "fast-deep-equal";

// components
import Card from "./card.component";

// styles
import * as Styled from "./canvas.styles";
import { HolderOutlined, PlusCircleFilled } from "@ant-design/icons";

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
              <HolderOutlined />
              {title.toUpperCase()}
            </Styled.Title>
            <PlusCircleFilled
              onClick={
                !paused ? () => dispatch(dispatch(addCard(title))) : null
              }
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
                    Click the <PlusCircleFilled /> icon on the top right corner
                    to add a new card.
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
