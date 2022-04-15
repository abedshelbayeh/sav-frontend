import { Tooltip } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Handle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 25px 0 0;
  width: 40px;
  height: 40px;
  pointer-events: all;
  cursor: pointer;
  transition: transform 0.25s;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: ${({ theme }) => theme.FLOAT_BACKGROUND};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
    border-radius: 50%;
    transition: transform 0.25s;
  }

  &:hover::after {
    transform: scale(1.1);
  }

  & .anticon {
    font-size: 16pt;
    color: ${({ theme }) => theme.FLOAT_COLOR};
  }

  &.open {
    transform: translate(200%);
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100%;
  margin: 0 -45px 0 0;
  padding: 10px;
  background-color: ${({ theme }) => theme.FLOAT_BACKGROUND};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
  border-radius: 5px;
  color: ${({ theme }) => theme.FLOAT_COLOR};
  pointer-events: all;
  transition: transform 0.25s;

  & .anticon {
    font-size: 18pt;
  }

  &.open {
    transform: translate(-150%);
  }
`;

export const Seperator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
  border-radius: 10px;
`;

export const Item = styled(Tooltip)`
  &.anticon {
    color: ${({ enabled, danger, theme }) => {
      if (enabled) {
        return theme.COLOR_POSITIVE;
      }
      if (danger) {
        return theme.COLOR_DANGER;
      }
      return theme.FLOAT_COLOR;
    }};

  :hover.anticon {
    color: ${({ theme }) => theme.primaryColor};
  }
`;
