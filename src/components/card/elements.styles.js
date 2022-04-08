import styled from "styled-components";

export const Mention = styled.span`
  display: inline-block;
  margin: 0 1px;
  padding: 0 3px;
  background-color: #d6e4ff;
  border-radius: 4px;
  box-shadow: ${({ selected, focused }) =>
    selected && focused ? "0 0 0 1px #adc6ff" : "none"};
  vertical-align: baseline;
  cursor: pointer;
`;

export const Paragraph = styled.p`
  margin: 0;
`;
