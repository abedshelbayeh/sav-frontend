import styled from "styled-components";

export const Mention = styled.span`
  display: inline-block;
  margin: 0 1px;
  padding: 0 0px;
  background-color: ${({ theme }) => theme.CANVAS_MENTION_BACKGROUND};
  box-shadow: ${({ selected, focused }) =>
    selected && focused ? "0 0 0 1px #adc6ff" : "none"};
  vertical-align: baseline;
  cursor: pointer;
`;

export const Paragraph = styled.p`
  margin: 0;
`;
