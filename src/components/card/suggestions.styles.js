import styled from "styled-components";
import {
  LIGHTGREY_BACKGROUND_BORDER,
  SUBTITLE_COLOR,
  SUBTITLE_FONT_SIZE,
} from "../../style-variables";

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  padding: 0;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 29px 0px;
  overflow: hidden;
`;

export const Item = styled.div`
  background-color: ${({ selected }) =>
    selected ? LIGHTGREY_BACKGROUND_BORDER : "transparent"};
  cursor: pointer;
  padding: 2px 20px 2px 5px;

  &:hover {
    background-color: ${LIGHTGREY_BACKGROUND_BORDER};
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px;
`;

export const Subtitle = styled.div`
  font-size: ${SUBTITLE_FONT_SIZE};
  color: ${SUBTITLE_COLOR};
  margin-top: -5px;
`;
