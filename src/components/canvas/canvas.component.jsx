import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import deepEqual from "fast-deep-equal";

// components
import Column from "./column.component";
import ControlPanel from "./control-panel.component";

// styled
import { Alert, Spin } from "antd";
import * as Styled from "./canvas.styles";

// actions
import {
  fetchCardsStart,
  moveCard,
  moveColumn,
} from "../../redux/canvas/canvas.actions";

// selectors
import {
  selectOrderedColumnIds,
  selectLoading,
} from "../../redux/canvas/canvas.selectors";

const Canvas = ({ boardId, boardName, columns }) => {
  const dispatch = useDispatch();

  const orderedColumnIds = useSelector(selectOrderedColumnIds, deepEqual);
  const loading = useSelector(selectLoading);
  const uid = useSelector(({ user: { user: { uid } = {} } = {} }) => uid);
  const { paused } = useSelector(({ canvas: { settings } }) => settings);

  useEffect(() => {
    dispatch(fetchCardsStart(boardId, columns, uid));
  }, [dispatch, columns, boardId, uid]);

  const onDragEnd = ({ type, source, destination, draggableId }) => {
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "COLUMN") {
      dispatch(moveColumn(source, destination, draggableId));
    }
    if (type === "CARD") {
      dispatch(moveCard(source, destination, draggableId));
    }
  };

  if (loading) {
    return (
      <Styled.Loading>
        <Spin size="large" />
      </Styled.Loading>
    );
  }

  const { innerWidth } = window;
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {paused && (
          <Alert
            message="Your host has paused this board. You won't be able to contribute just yet!"
            type="info"
            showIcon
          />
        )}
        <Droppable
          droppableId="canvas"
          direction={innerWidth <= 850 ? "vertical" : "horizontal"}
          type="COLUMN"
        >
          {(provided) => (
            <Styled.Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {orderedColumnIds.map((columnId, index) => {
                return (
                  <Column
                    key={columnId}
                    boardId={boardId}
                    title={columnId}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Styled.Container>
          )}
        </Droppable>
      </DragDropContext>
      <ControlPanel boardName={boardName} />
    </>
  );
};

export default memo(Canvas);
