import { useState } from "react";
import deepEqual from "fast-deep-equal";

// components
import Editor from "./editor.component";

// styles
import { SyncOutlined } from "@ant-design/icons";
import * as Styled from "./textarea.styles";

const Textarea = ({
  autoSave,
  localValue,
  cloudValue,
  selection,
  onChange,
  onSave,
  disabled,
}) => {
  const [timer, setTimer] = useState(null);

  const handleChange = (input) => {
    if (autoSave) {
      if (timer) {
        clearTimeout(timer);
      }
      const timeout = setTimeout(() => {
        onSave();
      }, autoSave.every || 3000);
      setTimer(timeout);
    }
    onChange(input);
  };

  return (
    <Styled.Container>
      <Editor
        value={localValue || cloudValue}
        selection={selection}
        disabled={disabled}
        placeholder="What's on your mind?"
        onChange={handleChange}
      />
      <Styled.Overlay>
        {localValue && !deepEqual(localValue, cloudValue) && (
          <SyncOutlined spin />
        )}
      </Styled.Overlay>
    </Styled.Container>
  );
};

export default Textarea;
