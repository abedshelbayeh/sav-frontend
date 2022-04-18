import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Avatar from "../common/avatar.component";
import InvitePeople from "../../components/people/invite-people.component";
import Counts from "../common/counts.component";

// styles
import * as Styled from "./people.styles";
import { Button, Table } from "antd";

// actions
import {
  fetchPeopleStart,
  toggleInvitePeople,
  setFilter,
} from "../../redux/people/people.actions";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, { name, email }) => (
      <Styled.User>
        <Avatar>{name}</Avatar>
        <div>
          <span>{name}</span>
          <Styled.Subtitle>{email}</Styled.Subtitle>
        </div>
      </Styled.User>
    ),
  },
];

const People = () => {
  const dispatch = useDispatch();

  const { filter, data, pagination, loading } = useSelector(
    ({ people }) => people
  );

  useEffect(() => {
    dispatch(fetchPeopleStart());
  }, [dispatch]);

  const { total } = pagination;
  return (
    <>
      <InvitePeople />
      <Styled.Header>
        <Styled.Search
          placeholder="Search people..."
          onSearch={(filter) => dispatch(setFilter(filter))}
          defaultValue={filter}
          size="large"
        />
        <Button
          type="primary"
          size="large"
          onClick={() => dispatch(toggleInvitePeople())}
        >
          Invite
        </Button>
      </Styled.Header>
      <Counts counts={[{ title: "Active", count: total }]} />
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={pagination}
        onChange={(pagination) => dispatch(fetchPeopleStart(pagination))}
        loading={loading}
        size="small"
      />
    </>
  );
};

export default People;
