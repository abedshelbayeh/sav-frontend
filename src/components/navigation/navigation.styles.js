import { Switch } from "antd";
import styled, { css } from "styled-components";

import { NAVIGATION_HEIGHT } from "../layout/layout.styles";

export const Container = styled.div`
  height: ${NAVIGATION_HEIGHT}px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 20px;
  background-color: ${({ theme }) => theme.BACKGROUND_200};
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
  border-bottom: ${({ theme }) =>
    `1px solid ${theme.COLOR_TRANSPARENT_BORDER}`};
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.div.attrs(({ theme }) => ({
  as: theme.LOGO,
}))`
  height: 25px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  margin: 8px;
  border-radius: 6px;
  gap: 5px;
  transition: 0.15s ease;

  ${({ button, toggle }) =>
    !button &&
    !toggle &&
    css`
      :hover {
        color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT_HOVER};
        cursor: pointer;
        background: ${({ theme }) => theme.BACKGROUND_TRANSPARENT_OVERLAY};
      }
    `}

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.primaryColor} !important;
      position: relative;

      ::after {
        content: "";
        position: absolute;
        bottom: -${NAVIGATION_HEIGHT / 2 - 16.5}px;
        z-index: 1;
        border-radius: 2px 2px 0 0;
        height: 4px;
        left: 4px;
        right: 4px;
        background-color: ${({ theme }) => theme.primaryColor};
      }
    `}
`;

export const SecondaryItem = styled(Item)`
  font-size: 20px;
  border-radius: 50%;

  & :focus {
    box-shadow: none !important;
  }
`;

export const Toggle = styled(Switch)`
  background-color: ${({ theme }) => theme.BACKGROUND_50};

  & .ant-switch-handle::before {
    background-color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
  }
`;
