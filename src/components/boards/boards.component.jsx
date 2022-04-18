import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Counts from "../common/counts.component";
import confirm from "./utils/confirm-delete";

// styles
import { Table, Button } from "antd";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import * as Styled from "./boards.styles";

// actions
import {
  deleteBoard,
  fetchBoardsStart,
  toggleEditBoard,
  setFilter,
} from "../../redux/boards/boards.actions";

const Boards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { filter, data, pagination, loading } = useSelector(
    ({ boards }) => boards
  );

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
      render: (number) => <span>{number}</span>,
      responsive: ["sm"],
    },
    {
      render: (_, { name, id }) => (
        <Styled.Actions>
          <Button
            onClick={() => dispatch(toggleEditBoard(id))}
            type="link"
            size="small"
            icon={<Icon icon={faPenToSquare} />}
          />
          <Button
            onClick={() => confirm(name, async () => dispatch(deleteBoard(id)))}
            type="text"
            size="small"
            danger
            icon={<Icon icon={faTrashCan} />}
          />
        </Styled.Actions>
      ),
    },
  ];

  const { total } = pagination;
  return (
    <>
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
      <Counts
        counts={[
          { title: "Active", count: total },
          { title: "Archived", count: 0 },
        ]}
      />
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
