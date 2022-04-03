import { useDispatch, useSelector } from "react-redux";

// components
import People from "../../components/people/people.component";
import InvitePeople from "../../components/people/invite-people.component";

// actions
import {
  setFilter,
  toggleInvitePeople,
} from "../../redux/people/people.actions";

// styles
import * as Styled from "./people-page.styles";
import { Button } from "antd";

const PeoplePage = () => {
  const dispatch = useDispatch();

  const filter = useSelector(({ people: { filter } }) => filter);

  return (
    <Styled.Container>
      <InvitePeople />
      <Styled.Header>
        <Styled.Search
          placeholder="Search people..."
          onSearch={(filter) => dispatch(setFilter(filter))}
          size="large"
          defaultValue={filter}
        />
        <Button
          size="large"
          type="primary"
          onClick={() => dispatch(toggleInvitePeople())}
        >
          Invite
        </Button>
      </Styled.Header>
      <People />
    </Styled.Container>
  );
};

export default PeoplePage;
