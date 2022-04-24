import styled, { css } from "styled-components";
import { NAVIGATION_WIDTH } from "../layout/layout.styles";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${NAVIGATION_WIDTH}px;
  padding: 20px 10px;
  background-color: ${({ theme }) => theme.BG100};
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  color: ${({ theme }) => theme.TEXT_PRIMARY};
`;

export const Logo = styled.div.attrs(({ theme }) => ({
  as: theme.LOGO,
}))`
  height: 25px;
  width: 25px;
  margin: 0 0 25px 0;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const Item = styled.div`
  font-size: 14pt;
  position: relative;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.primaryColor};
  }

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.primaryColor} !important;

      ::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: -${NAVIGATION_WIDTH / 2 - 12.5}px;
        z-index: 1;
        border-radius: 2px 0 0 2px;
        width: 2px;
        height: 100%;
        background-color: ${({ theme }) => theme.primaryColor};
      }
    `}
`;

export const Icon = styled.div`
  width: 25px;
  text-align: center;
`;
