import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createEditor, Editor, Range, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

// components
import Suggestions from "./suggestions.component";
import { Block } from "./elements.component";

// styles
import * as Styled from "./editor.styles";

const withMentions = (editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = (element) =>
    element.type === "MENTION" ? true : isInline(element);
  editor.isVoid = (element) =>
    element.type === "MENTION" ? true : isVoid(element);
  return editor;
};

const insertMention = (editor, user) => {
  Transforms.insertNodes(editor, {
    type: "MENTION",
    user,
    children: [{ text: "" }],
  });
  Transforms.move(editor);
};

const getTarget = (editor, regex) => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const [start] = Range.edges(selection);
    const wordBefore = Editor.before(editor, start, { unit: "word" });
    const before = wordBefore && Editor.before(editor, wordBefore);
    const beforeRange = before && Editor.range(editor, before, start);
    const beforeText = beforeRange && Editor.string(editor, beforeRange);
    const beforeMatch = beforeText && beforeText.match(regex);
    const after = Editor.after(editor, start);
    const afterRange = Editor.range(editor, start, after);
    const afterText = Editor.string(editor, afterRange);
    const afterMatch = afterText.match(/^(\s|$)/);

    if (beforeMatch && afterMatch) {
      return {
        target: beforeRange,
        search: beforeMatch[1],
      };
    }
  }
};

const Component = ({ value, selection, onChange, disabled }) => {
  const [editor] = useState(() =>
    withMentions(withReact(withHistory(createEditor())))
  );

  const [portalTarget, setPortalTarget] = useState();
  const [portalIndex, setPortalIndex] = useState(0);
  const [portalFilter, setPortalFilter] = useState("");

  const people = useSelector(({ people: { data } }) => data);
  const filtered = people
    .filter(({ name }) =>
      name.toLowerCase().includes(portalFilter.toLowerCase())
    )
    .slice(0, 5);

  useEffect(() => {
    editor.children = value;
    editor.selection = selection;
    editor.onChange();
  }, [editor, value, selection]);

  const renderElement = useCallback((props) => <Block {...props} />, []);

  const onKeyDown = useCallback(
    (event) => {
      if (portalTarget) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex =
              portalIndex >= filtered.length - 1 ? 0 : portalIndex + 1;
            setPortalIndex(prevIndex);
            break;

          case "ArrowUp":
            event.preventDefault();
            const nextIndex =
              portalIndex <= 0 ? filtered.length - 1 : portalIndex - 1;
            setPortalIndex(nextIndex);
            break;

          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, portalTarget);
            insertMention(editor, filtered[portalIndex]);
            setPortalTarget(null);
            break;

          case "Escape":
            event.preventDefault();
            setPortalTarget(null);
            break;

          default:
            return;
        }
      }
    },
    [editor, portalIndex, portalTarget, filtered]
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        const isNotSelectionChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isNotSelectionChange) {
          onChange({ value, selection: editor.selection });
        }

        const target = getTarget(editor, /^@(\w+|)$/);
        if (target) {
          setPortalTarget(target.target);
          setPortalFilter(target.search);
          setPortalIndex(0);
          return;
        }
        setPortalTarget(null);
      }}
    >
      <Styled.Textarea>
        <Editable
          readOnly={disabled}
          placeholder="What's on your mind?"
          renderElement={renderElement}
          onKeyDown={onKeyDown}
        />
      </Styled.Textarea>
      {portalTarget && filtered.length > 0 && (
        <Suggestions
          editor={editor}
          target={portalTarget}
          items={filtered}
          index={portalIndex}
          onSelect={(selected) => {
            editor.selection = portalTarget;
            insertMention(editor, selected);
          }}
        />
      )}
    </Slate>
  );
};

export default Component;
