import { useFocused, useSelected } from "slate-react";

// styles
import * as Styled from "./elements.styles";

export const Mention = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();

  const { user: { id, name } = {} } = element;
  return (
    <Styled.Mention
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${id}`}
      selected={selected}
      focused={focused}
    >
      {name}
      {children}
    </Styled.Mention>
  );
};

export const Block = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "MENTION":
      return <Mention {...props} />;

    default:
      return <Styled.Paragraph {...attributes}>{children}</Styled.Paragraph>;
  }
};
