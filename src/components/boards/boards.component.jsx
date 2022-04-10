import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import confirm from "./utils/confirm-delete";

// styles
import * as Styled from "./boards.styles";
import { Table, Badge, Button } from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";

// actions
import {
  deleteBoard,
  fetchBoardsStart,
  toggleEditBoard,
} from "../../redux/boards/boards.actions";

const Boards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, pagination, loading } = useSelector(({ boards }) => boards);

  useEffect(() => {
    dispatch(fetchBoardsStart());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name, id }) => (
        <Button
          size="small"
          type="link"
          onClick={() => navigate(`/boards/${id}`)}
        >
          {name}
        </Button>
      ),
    },
    {
      title: "Template",
      dataIndex: "templateName",
      key: "templateName",
      responsive: ["md"],
    },
    {
      title: "Participants",
      dataIndex: "numberOfParticipants",
      key: "numberOfParticipants",
      render: (number) => (
        <Styled.NumberOfParticipants count={number} overflowCount={Infinity} />
      ),
      responsive: ["sm"],
    },
    {
      render: (_, { name, id }) => (
        <Styled.Actions>
          <Button
            onClick={() => dispatch(toggleEditBoard(id))}
            type="link"
            size="small"
            icon={<EditFilled />}
          />
          <Button
            onClick={() => confirm(name, async () => dispatch(deleteBoard(id)))}
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
          />
        </Styled.Actions>
      ),
    },
  ];

  const { total } = pagination;
  return (
    <>
      <Styled.Header>
        <h2>Boards</h2>
        <Badge count={total} />
      </Styled.Header>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={pagination}
        onChange={(pagination) => dispatch(fetchBoardsStart(pagination))}
        loading={loading}
        size="small"
      />
    </>
  );
};

export default Boards;
