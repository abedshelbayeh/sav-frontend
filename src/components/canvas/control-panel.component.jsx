import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// components
import confirm from "../boards/utils/confirm-delete";

// styles
import {
  DeleteOutlined,
  EditOutlined,
  HourglassOutlined,
  LikeOutlined,
  NumberOutlined,
  PauseCircleOutlined,
  SearchOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import * as Styled from "./control-panel.styles";

// actions
import {
  deleteBoard,
  toggleEditBoard,
} from "../../redux/boards/boards.actions";
import {
  toggleCardsVisibility,
  togglePause,
  toggleVotingAbility,
  toggleVotingVisibility,
} from "../../redux/canvas/canvas.actions";

const ControlPanel = ({ boardName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();

  const handleRef = createRef();
  const panelRef = createRef();
  const togglePanel = () => {
    const handle = handleRef.current;
    const panel = panelRef.current;
    handle.classList.toggle("open");
    panel.classList.toggle("open");
  };

  const { cardsVisible, votingEnabled, votesVisible, paused } = useSelector(
    ({ canvas: { settings } }) => settings
  );

  return (
    <>
      <Styled.Handle
        ref={handleRef}
        onClick={() => {
          togglePanel();
        }}
      >
        <SlidersOutlined />
      </Styled.Handle>
      <Styled.Panel ref={panelRef}>
        <Styled.Item placement="left" title="Start timer">
          <HourglassOutlined onClick={() => {}} />
        </Styled.Item>
        <Styled.Item
          enabled={cardsVisible}
          placement="left"
          title={
            cardsVisible ? "Hide other people's cards" : "Show everyone's cards"
          }
        >
          <SearchOutlined
            onClick={() => {
              dispatch(toggleCardsVisibility());
            }}
          />
        </Styled.Item>
        <Styled.Item
          enabled={votesVisible}
          placement="left"
          title={votesVisible ? "Hide number of likes" : "Show number of likes"}
        >
          <NumberOutlined
            onClick={() => {
              dispatch(toggleVotingVisibility());
            }}
          />
        </Styled.Item>
        <Styled.Item
          enabled={paused}
          placement="left"
          title={paused ? "Unpause board" : "Pause board"}
        >
          <PauseCircleOutlined
            onClick={() => {
              dispatch(togglePause());
            }}
          />
        </Styled.Item>
        <Styled.Item
          enabled={votingEnabled}
          placement="left"
          title={
            votingEnabled
              ? "Disable the ability to like"
              : "Enable the ability to like"
          }
        >
          <LikeOutlined
            onClick={() => {
              dispatch(toggleVotingAbility());
            }}
          />
        </Styled.Item>
        <Styled.Seperator />
        <Styled.Item placement="left" title="Edit board">
          <EditOutlined onClick={() => dispatch(toggleEditBoard(boardId))} />
        </Styled.Item>
        <Styled.Item placement="left" title="Delete board" danger>
          <DeleteOutlined
            onClick={() =>
              confirm(boardName, async () =>
                dispatch(deleteBoard(boardId, () => navigate("/boards")))
              )
            }
          />
        </Styled.Item>
      </Styled.Panel>
    </>
  );
};

export default ControlPanel;
