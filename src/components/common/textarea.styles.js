import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Textarea = styled.textarea`
  width: 100%;
  outline: none;
  resize: none;
  hyphens: auto;
  font-weight: 500;
  border: none;
  padding: 0 30px 0 0;
  background-color: inherit;

  &:disabled {
    background-color: inherit;
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: -6px;
  right: -2px;

  & .anticon {
    font-size: 10pt;
    color: #096dd9;
  }
`;
