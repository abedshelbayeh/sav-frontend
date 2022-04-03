import { Button } from "antd";
import * as Styled from "./card.styles";

const Card = ({ id, title, description, cover, selected, onSelect }) => {
  return (
    <div>
      <Styled.Card selected={selected}>
        <Styled.Cover image={cover} />
        <Styled.Overlay>
          <div>{description}</div>
          <Styled.Actions>
            <Button type="primary" onClick={() => onSelect(id)}>
              Select
            </Button>
          </Styled.Actions>
        </Styled.Overlay>
        <Styled.Selected selected={selected}>
          <Styled.SelectedIcon />
        </Styled.Selected>
      </Styled.Card>
      <Styled.Title level={5}>{title}</Styled.Title>
    </div>
  );
};

export default Card;
