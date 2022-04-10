import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import service from "../../interfaces/service";

// components
import Canvas from "../../components/canvas/canvas.component";
import confirm from "../../components/boards/utils/confirm-delete";
import notify from "../../utils/notification.util";

// actions
import {
  deleteBoard,
  toggleEditBoard,
} from "../../redux/boards/boards.actions";

// styles
import { Typography, Button, Result, Spin } from "antd";
import {
  DeleteOutlined,
  EllipsisOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import * as Styled from "./board-page.styles";

// actions
import {
  fetchPeopleStart,
  resetPeople,
} from "../../redux/people/people.actions";

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { boardId } = useParams();

  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState({});

  useEffect(() => {
    const getBoard = async () => {
      setLoading(true);
      const { data: { rows = [] } = {} } = await service(
        "get",
        `/v1/boards/${boardId}`
      );
      const [board = {}] = rows;
      setBoard(board);
      setLoading(false);
    };
    dispatch(fetchPeopleStart({ current: 1, pageSize: 0 }));
    getBoard();
    return () => {
      dispatch(resetPeople());
    };
  }, [boardId, dispatch]);

  const onTitleChange = async (input) => {
    try {
      setBoard({ ...board, name: input });
      await service("post", `/v1/boards/`, {
        id: boardId,
        name: input,
      });
    } catch (error) {
      notify(
        "error",
        "Something's not right,",
        "We're unable to update the title at this moment. If this continues to happen, support can help!"
      );
    }
  };

  const { id, name, columns } = board;

  if (loading) {
    return (
      <Styled.Loading>
        <Spin size="large" />
      </Styled.Loading>
    );
  }

  if (!id) {
    return (
      <Styled.NotFound>
        <Result
          status="404"
          title="Uh-Oh"
          subTitle="We can't find the board you're looking for! It might have been deleted."
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Back
            </Button>
          }
        />
      </Styled.NotFound>
    );
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>
          <Styled.Back onClick={() => navigate("/boards")}>
            <ArrowLeftOutlined />
            <span>Boards</span>
          </Styled.Back>
          <Typography.Title
            level={2}
            editable={{
              onChange: onTitleChange,
              icon: <EditOutlined />,
              enterIcon: null,
              maxLength: 50,
              autoFocus: true,
            }}
          >
            {name}
          </Typography.Title>
        </Styled.Title>
        <Styled.Actions>
          <Button
            shape="circle"
            icon={
              <EditOutlined
                onClick={() => dispatch(toggleEditBoard(boardId))}
              />
            }
          />
          <Button
            shape="circle"
            type="danger"
            icon={
              <DeleteOutlined
                onClick={() =>
                  confirm(name, async () =>
                    dispatch(deleteBoard(boardId, () => navigate("/boards")))
                  )
                }
              />
            }
          />
          <Button shape="circle" icon={<EllipsisOutlined />} />
        </Styled.Actions>
      </Styled.Header>
      <Canvas boardId={id} columns={columns} />
    </Styled.Container>
  );
};

export default BoardPage;
