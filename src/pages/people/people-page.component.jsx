// components
import People from "../../components/people/people.component";

// styles
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./people-page.styles";

const PeoplePage = () => {
  return (
    <Styled.Container>
      <Styled.Title>
        <Icon icon={faUsers} />
        <span>People</span>
      </Styled.Title>
      <People />
    </Styled.Container>
  );
};

export default PeoplePage;
