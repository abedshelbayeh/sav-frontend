import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Templates from "./templates.component";
import Participants from "./participants.component";

// styles
import { Button, Modal, Steps } from "antd";
import * as Styled from "./edit-board.styles";

// actions
import {
  editBoard,
  fetchBoardStart,
  toggleEditBoard,
} from "../../redux/boards/boards.actions";

const Component = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    boardId,
    loading,
    saving,
    board: { templateId, participants },
  } = useSelector(({ boards: { modal } }) => modal);

  const [step, setStep] = useState(boardId ? 1 : 0);

  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState({});

  const selectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
    setStep(1);
  };

  useEffect(() => {
    dispatch(fetchBoardStart(boardId));
  }, [dispatch, boardId]);

  useEffect(() => {
    setSelectedTemplateId(templateId);
  }, [templateId]);

  useEffect(() => {
    setSelectedParticipants(participants);
  }, [participants]);

  return (
    <Styled.Container>
      <Styled.Content>
        {step === 0 && (
          <Templates
            selectedTemplateId={selectedTemplateId}
            onSelect={selectTemplate}
          />
        )}
        {step === 1 && (
          <Participants
            onBack={() => setStep(0)}
            selectedParticipants={selectedParticipants}
            setParticipants={setSelectedParticipants}
          />
        )}
      </Styled.Content>
      <Styled.Stepper>
        <Steps current={step} direction="vertical" progressDot>
          <Steps.Step
            title="Template"
            description="Choose a template for this board"
          />
          <Steps.Step
            title="Participants"
            description="Who's going to participate?"
          />
        </Steps>
      </Styled.Stepper>
      {!loading && step === 1 && (
        <Styled.Actions>
          <Button
            type="primary"
            size="large"
            loading={saving}
            onClick={() =>
              dispatch(
                editBoard(
                  boardId,
                  {
                    templateId: selectedTemplateId,
                    participants: Object.keys(selectedParticipants),
                  },
                  (boardId) => navigate(`/boards/${boardId}`)
                )
              )
            }
          >
            Save
          </Button>
        </Styled.Actions>
      )}
    </Styled.Container>
  );
};

const EditBoard = () => {
  const dispatch = useDispatch();

  const { visible, boardId } = useSelector(({ boards: { modal } }) => modal);

  return (
    <Modal
      visible={visible}
      width="95%"
      style={{ padding: 0 }}
      bodyStyle={{ height: "92vh", overflow: "scroll" }}
      onCancel={() => dispatch(toggleEditBoard(boardId))}
      footer={null}
      centered
      destroyOnClose
    >
      <Component />
    </Modal>
  );
};

export default EditBoard;
