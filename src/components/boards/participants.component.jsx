import { useState } from "react";
import { useSelector } from "react-redux";

// components
import Avatar from "../common/avatar.component";

// styles
import { Mentions, Empty, Badge, Spin } from "antd";
import { ArrowLeftOutlined, DeleteTwoTone } from "@ant-design/icons";
import { DANGER_COLOR } from "../../style-variables";
import * as Styled from "./participants.styles";

const Participants = ({
  onBack,
  selectedParticipants = {},
  setParticipants,
}) => {
  const [mention, setMention] = useState(null);

  const { loading, people = {} } = useSelector(
    ({ boards: { modal } }) => modal
  );

  if (loading) {
    return (
      <Styled.Loading>
        <Spin size="large" />
      </Styled.Loading>
    );
  }

  return (
    <div>
      <Styled.Breadcrumbs onClick={onBack}>
        <ArrowLeftOutlined />
        <Styled.Title level={4}>Templates</Styled.Title>
      </Styled.Breadcrumbs>
      <Styled.People>
        <Mentions
          onChange={setMention}
          onSelect={({ value }) => {
            setParticipants({ ...selectedParticipants, [value]: true });
            setMention(null);
          }}
          autoFocus
          value={mention}
          placeholder="@John Smith"
          filterOption={(input, { children }) =>
            children
              .replace(" ", "")
              .toLowerCase()
              .includes(input.replace(" ", "").toLowerCase())
          }
        >
          {Object.values(people)
            .filter(({ id }) => !selectedParticipants[id])
            .map(({ id, name }) => (
              <Mentions.Option key={id} value={id}>
                {name}
              </Mentions.Option>
            ))}
        </Mentions>
        <Styled.Header>
          <h2>Participants</h2>
          <Badge
            count={Object.keys(selectedParticipants).length}
            overflowCount={Infinity}
          />
        </Styled.Header>
        <Styled.Participants>
          {Object.keys(selectedParticipants).length ? (
            Object.keys(selectedParticipants).map((participant) => {
              const { name, email } = people[participant] || {};
              return (
                <Styled.Participant key={participant}>
                  <Styled.User>
                    <Avatar>{name}</Avatar>
                    <div>
                      <span>{name}</span>
                      <Styled.Subtitle>{email}</Styled.Subtitle>
                    </div>
                  </Styled.User>
                  <DeleteTwoTone
                    twoToneColor={DANGER_COLOR}
                    onClick={() => {
                      const { [participant]: remove, ...rest } =
                        selectedParticipants;
                      setParticipants(rest);
                    }}
                  />
                </Styled.Participant>
              );
            })
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="To add participants, @ them in the mention box above."
            />
          )}
        </Styled.Participants>
      </Styled.People>
    </div>
  );
};

export default Participants;
