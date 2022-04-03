import { useSelector, useDispatch } from "react-redux";

// components
import Boards from "../../components/boards/boards.component";

// actions
import { setFilter, toggleEditBoard } from "../../redux/boards/boards.actions";

// styles
import * as Styled from "./boards-page.styles";
import { Button } from "antd";

const BoardsPage = () => {
  const dispatch = useDispatch();

  const filter = useSelector(({ boards: { filter } }) => filter);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Search
          placeholder="Search boards..."
          onSearch={(filter) => dispatch(setFilter(filter))}
          size="large"
          defaultValue={filter}
        />
        <Button
          size="large"
          type="primary"
          onClick={() => dispatch(toggleEditBoard())}
        >
          Create a board
        </Button>
      </Styled.Header>
      <Boards />
    </Styled.Container>
  );
};

export default BoardsPage;
