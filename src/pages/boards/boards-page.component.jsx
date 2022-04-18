// components
import Boards from "../../components/boards/boards.component";

// styles
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./boards-page.styles";

const BoardsPage = () => {
  return (
    <Styled.Container>
      <Styled.Title>
        <Icon icon={faChalkboard} />
        <span>Boards</span>
      </Styled.Title>
      <Boards />
    </Styled.Container>
  );
};

export default BoardsPage;
