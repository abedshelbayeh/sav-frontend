import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// components
import confirm from "../boards/utils/confirm-delete";

// styles
import { Tooltip } from "antd";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faWindowMinimize,
  faHourglass,
  faEye,
  faHashtag,
  faPause,
  faThumbsUp,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import * as Styled from "./control-panel.styles";

// actions
import {
  deleteBoard,
  toggleEditBoard,
} from "../../redux/boards/boards.actions";
import {
  toggleCardsVisibility,
  togglePause,
  toggleTimer,
  toggleVotingAbility,
  toggleVotingVisibility,
} from "../../redux/canvas/canvas.actions";

const ControlPanel = ({ boardName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();

  const overlayRef = createRef();
  const handleRef = createRef();
  const panelRef = createRef();

  const togglePanel = () => {
    const overlay = overlayRef.current;
    const handle = handleRef.current;
    const panel = panelRef.current;

    overlay.classList.toggle("open");
    handle.classList.toggle("open");
    panel.classList.toggle("open");
  };

  const { cardsVisible, votingEnabled, votesVisible, paused, timer } =
    useSelector(({ canvas: { settings } }) => settings);

  return (
    <Styled.Container>
      <Styled.Overlay ref={overlayRef} onClick={() => togglePanel()} />
      <Styled.Handle
        ref={handleRef}
        onClick={() => {
          togglePanel();
        }}
      >
        <Icon icon={faSliders} />
      </Styled.Handle>
      <Styled.Panel ref={panelRef}>
        <Styled.Minimize
          icon={faWindowMinimize}
          onClick={() => {
            togglePanel();
          }}
        />
        <Tooltip placement="left" title={timer ? "Hide timer" : "Start timer"}>
          <Styled.Icon
            $enabled={!!timer}
            icon={faHourglass}
            onClick={() => {
              dispatch(toggleTimer());
            }}
          />
        </Tooltip>
        <Tooltip
          placement="left"
          title={
            cardsVisible ? "Hide other people's cards" : "Show everyone's cards"
          }
        >
          <Styled.Icon
            $enabled={cardsVisible}
            icon={faEye}
            onClick={() => {
              dispatch(toggleCardsVisibility());
            }}
          />
        </Tooltip>
        <Tooltip
          placement="left"
          title={votesVisible ? "Hide number of likes" : "Show number of likes"}
        >
          <Styled.Icon
            icon={faHashtag}
            $enabled={votesVisible}
            onClick={() => {
              dispatch(toggleVotingVisibility());
            }}
          />
        </Tooltip>
        <Tooltip
          placement="left"
          title={paused ? "Unpause board" : "Pause board"}
        >
          <Styled.Icon
            icon={faPause}
            $enabled={paused}
            onClick={() => {
              dispatch(togglePause());
            }}
          />
        </Tooltip>
        <Tooltip
          placement="left"
          title={
            votingEnabled
              ? "Disable the ability to like"
              : "Enable the ability to like"
          }
        >
          <Styled.Icon
            $enabled={votingEnabled}
            icon={faThumbsUp}
            onClick={() => {
              dispatch(toggleVotingAbility());
            }}
          />
        </Tooltip>
        <Styled.Seperator />
        <Tooltip placement="left" title="Edit board">
          <Styled.Icon
            icon={faPenToSquare}
            onClick={() => dispatch(toggleEditBoard(boardId))}
          />
        </Tooltip>
        <Tooltip placement="left" title="Delete board" $danger>
          <Styled.Icon
            icon={faTrashCan}
            $danger
            onClick={() =>
              confirm(boardName, async () =>
                dispatch(deleteBoard(boardId, () => navigate("/boards")))
              )
            }
          />
        </Tooltip>
      </Styled.Panel>
    </Styled.Container>
  );
};

export default ControlPanel;
