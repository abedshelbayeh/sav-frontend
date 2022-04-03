import styled, { css } from "styled-components";
import { ReactComponent as ColoredLogo } from "../../assets/logo-color.svg";

import { NAVIGATION_HEIGHT } from "../layout/layout.styles";

export const Container = styled.div`
  height: ${NAVIGATION_HEIGHT}px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 20px;
  background: white;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;

  ::after {
    content: "";
    position: absolute;
    top: ${NAVIGATION_HEIGHT}px;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      rgba(9, 30, 66, 0.13) 0px,
      rgba(9, 30, 66, 0.13) 1px,
      rgba(9, 30, 66, 0.08) 1px,
      rgba(9, 30, 66, 0) 4px
    );
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(ColoredLogo)`
  height: 25px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  margin: 8px;
  border-radius: 6px;
  gap: 5px;

  ${({ button }) =>
    !button &&
    css`
      :hover {
        color: rgba(68, 108, 179, 1);
        cursor: pointer;
        background: rgba(68, 108, 179, 0.15);
      }
    `}

  ${({ selected }) =>
    selected &&
    css`
      position: relative;
      color: rgba(68, 108, 179, 1);

      ::after {
        content: "";
        position: absolute;
        bottom: -${NAVIGATION_HEIGHT / 2 - 17}px;
        height: 4px;
        left: 4px;
        right: 4px;
        background-color: rgba(68, 108, 179, 1);
      }
    `}
`;

export const SecondaryItem = styled(Item)`
  font-size: 20px;
  border-radius: 50%;

  :hover {
    color: rgba(68, 108, 179, 1);
    cursor: pointer;
    background: rgba(68, 108, 179, 0.15);
  }
`;
