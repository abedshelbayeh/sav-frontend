import { useState } from "react";
import { useSelector } from "react-redux";

// components
import Card from "../common/card.component";

// styles
import { Spin } from "antd";
import * as Styled from "./templates.styles";

const Templates = ({ selectedTemplateId, onSelect }) => {
  const [filtered, setFiltered] = useState([]);

  const { loading, templates } = useSelector(({ boards: { modal } }) => modal);

  const filter = (filter) => {
    const filtered = templates.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    setFiltered(filtered);
  };

  return (
    <div>
      <Styled.Header>
        <Styled.Search
          placeholder="Search templates by name"
          onSearch={filter}
          size="large"
        />
      </Styled.Header>
      {loading ? (
        <Styled.Loading>
          <Spin size="large" />
        </Styled.Loading>
      ) : (
        <div>
          <Styled.Title level={2}>Retrospective & Prospective</Styled.Title>
          <Styled.Templates>
            {(filtered.length ? filtered : templates).map(
              ({ id, name, description, cover }) => (
                <Card
                  key={id}
                  id={id}
                  title={name}
                  description={description}
                  cover={cover}
                  selected={id === selectedTemplateId}
                  onSelect={onSelect}
                />
              )
            )}
          </Styled.Templates>
        </div>
      )}
    </div>
  );
};

export default Templates;
