import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Avatar from "../common/avatar.component";

// styles
import * as Styled from "./people.styles";
import { Badge, Table } from "antd";

// actions
import { fetchPeopleStart } from "../../redux/people/people.actions";

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

  const { data, pagination, loading } = useSelector(({ people }) => people);

  useEffect(() => {
    dispatch(fetchPeopleStart());
  }, [dispatch]);

  const { total } = pagination;
  return (
    <>
      <Styled.Header>
        <h2>People</h2>
        <Badge count={total} overflowCount={Infinity} />
      </Styled.Header>
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
