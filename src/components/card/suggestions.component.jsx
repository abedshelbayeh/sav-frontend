import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { ReactEditor } from "slate-react";

// components
import Avatar from "../common/avatar.component";

// styles
import * as Styled from "./suggestions.styles";

const Portal = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

const Suggestions = ({ editor, items, index, target, onSelect }) => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    const domRange = ReactEditor.toDOMRange(editor, target);
    const rect = domRange.getBoundingClientRect();
    element.style.top = `${rect.top + window.pageYOffset + 24}px`;
    element.style.left = `${rect.left + window.pageXOffset}px`;
  }, [editor, target]);

  return (
    <Portal>
      <Styled.Container ref={ref} data-cy="portal">
        {items.map((item, i) => {
          const { id, name, email } = item;
          return (
            <Styled.Item
              key={id}
              selected={i === index}
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(item);
              }}
            >
              <Styled.User>
                <Avatar>{name}</Avatar>
                <div>
                  <span>{name}</span>
                  <Styled.Subtitle>{email}</Styled.Subtitle>
                </div>
              </Styled.User>
            </Styled.Item>
          );
        })}
      </Styled.Container>
    </Portal>
  );
};

export default Suggestions;
