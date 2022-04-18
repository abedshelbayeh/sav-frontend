import { useState } from "react";
import { useSelector } from "react-redux";

// components
import Avatar from "../common/avatar.component";

// styles
import { Select, Empty, Spin, Button } from "antd";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
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
        <Icon icon={faCircleLeft} />
        <Styled.Title level={4}>Templates</Styled.Title>
      </Styled.Breadcrumbs>
      <Styled.People>
        <Styled.Search
          onChange={setMention}
          onSelect={(value) => {
            setParticipants({ ...selectedParticipants, [value]: true });
            setMention(null);
          }}
          showSearch
          autoFocus
          value={mention}
          placeholder="John Smith"
          filterOption={(input, { children }) =>
            children
              .replace(" ", "")
              .toLowerCase()
              .includes(input.replace(" ", "").toLowerCase())
          }
          size="large"
        >
          {Object.values(people)
            .filter(({ id }) => !selectedParticipants[id])
            .map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
        </Styled.Search>
        <Styled.Header>
          <h2>Participants</h2>
          <Styled.Count
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
                  <Button
                    type="text"
                    danger
                    icon={<Icon icon={faTrashCan} />}
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
              description="To add participants, select them from the dropdown above."
            />
          )}
        </Styled.Participants>
      </Styled.People>
    </div>
  );
};

export default Participants;
