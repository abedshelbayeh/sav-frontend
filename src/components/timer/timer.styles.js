import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 20px 0 0;
  background-color: ${({ theme }) => theme.FLOAT_BACKGROUND};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
  border-radius: 5px;
  pointer-events: all;
  overflow: hidden;
`;

export const Overlay = styled.div`
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.TIMER_PROGRESS_BACKGROUND};
  pointer-events: none;
  transition: transform 0.25s;
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
`;

export const Time = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26pt;
  color: ${({ theme }) => theme.FLOAT_COLOR};

  & span {
    margin-top: -7px;
  }

  &.blink:not(:focus-within) {
    animation: blinker 1s ease-in-out infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0.25;
    }
  }
`;

export const Component = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 55px;
  padding: 0;
  text-align: center;
  color: ${({ theme }) => theme.FLOAT_COLOR};
`;

export const Actions = styled.div`
  margin: 0 15px 0 0;
`;

export const Add = styled.div`
  display: flex;
  margin: 0 6px 6px 6px;
  gap: 15px;
  z-index: 1;

  & .ant-btn {
    all: unset;
    color: ${({ theme }) => theme.FLOAT_COLOR};
    padding: 0 9px;
    cursor: pointer;
  }
`;
