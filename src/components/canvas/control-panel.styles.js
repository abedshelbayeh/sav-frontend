import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

export const Container = styled.div`
  display: flex;
`;

export const Overlay = styled.div`
  transition: background-color 0.25s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  &.open {
    background-color: rgba(0, 0, 0, 0.45);
    pointer-events: all;
  }
`;

export const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 22px 0 0;
  width: 40px;
  height: 40px;
  pointer-events: all;
  cursor: pointer;
  transition: transform 0.25s;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 50%;

  &:hover {
    transform: scale(1.1);
  }

  & svg {
    font-size: 14pt;
    color: white;
  }

  &.open {
    transform: translate(200%);
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-height: 100%;
  margin: 0 -65px 0 0;
  padding: 10px 10px 20px 10px;
  background-color: ${({ theme }) => theme.BG_FLOAT};
  box-shadow: rgba(0, 0, 0, 0.25) 0 1px 2px 0;
  border-radius: 5px;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  pointer-events: all;
  transition: transform 0.25s;

  &.open {
    transform: translate(-150%);
  }
`;

export const Seperator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.TEXT_SECONDARY};
  border-radius: 10px;
`;

export const Minimize = styled(
  forwardRef((props, ref) => <FontAwesomeIcon {...props} forwardedRef={ref} />)
)`
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

export const Icon = styled(
  forwardRef((props, ref) => <FontAwesomeIcon {...props} forwardedRef={ref} />)
)`
  cursor: pointer;
  font-size: 16pt;
  color: ${({ $enabled, $danger, theme }) => {
    if ($enabled) {
      return theme.COLOR_POSITIVE;
    }
    if ($danger) {
      return theme.COLOR_DANGER;
    }
    return theme.TEXT_PRIMARY;
  }};

  :hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;
