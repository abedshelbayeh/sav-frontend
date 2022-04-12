import { Tooltip } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Handle = styled.div`
  position: fixed;
  top: 70px;
  right: 0;
  background-color: ${({ theme }) => theme.BACKGROUND_50_TRANSPARENT};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px 0px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  transition: all 0.25s;
  cursor: pointer;

  & .anticon {
    font-size: 16pt;
    color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  }

  &:hover:not(.open) {
    margin: 0 25px 0 0;
  }

  &.open {
    margin-right: 80px;
  }
`;

export const Panel = styled.div`
  position: fixed;
  top: 70px;
  right: 0;
  background-color: ${({ theme }) => theme.BACKGROUND_50_TRANSPARENT};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-right: -50px;
  padding: 10px;
  transition: all 0.3s;
  border: ${({ theme }) => theme.COLOR_SOLID_BORDER};
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};

  & .anticon {
    font-size: 18pt;
  }

  &.open {
    margin-right: 20px;
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
      return theme.COLOR_PRIMARY_TEXT;
    }};

  :hover.anticon {
    color: ${({ theme }) => theme.primaryColor};
  }
`;
