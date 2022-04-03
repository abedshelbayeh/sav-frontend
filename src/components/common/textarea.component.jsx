import { createRef, memo, useEffect, useRef, useState } from "react";

// styles
import { SyncOutlined } from "@ant-design/icons";
import * as Styled from "./textarea.styles";

const isEmpty = (s) => s === null || s === undefined;

const Textarea = ({
  localValue,
  cloudValue,
  onChange,
  onSave,
  autoSave,
  disabled,
}) => {
  const [timer, setTimer] = useState(null);

  const textareaRef = createRef();
  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [textareaRef]);

  const localValueRef = useRef(localValue);
  localValueRef.current = localValue;

  const cloudValueRef = useRef(cloudValue);
  cloudValueRef.current = cloudValue;

  const handleChange = (input) => {
    if (autoSave) {
      if (timer) {
        clearTimeout(timer);
      }
      const timeout = setTimeout(() => {
        if (localValueRef.current !== cloudValueRef.current) {
          onSave(localValueRef.current);
        }
      }, autoSave.every || 3000);
      setTimer(timeout);
    }
    onChange(input);
  };

  return (
    <Styled.Container>
      <Styled.Textarea
        value={!isEmpty(localValue) ? localValue : cloudValue}
        autoFocus={true}
        ref={textareaRef}
        onChange={({ target: { value } }) => handleChange(value)}
        rows={1}
        placeholder="What's on your mind?"
        disabled={disabled}
      />
      <Styled.Overlay>
        {!isEmpty(localValue) && localValue !== cloudValue && (
          <SyncOutlined spin />
        )}
      </Styled.Overlay>
    </Styled.Container>
  );
};

export default memo(
  Textarea,
  (prevProps, nextProps) =>
    prevProps.localValue === nextProps.localValue &&
    prevProps.cloudValue === nextProps.cloudValue
);
