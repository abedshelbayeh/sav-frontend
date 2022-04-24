import { Avatar as AntAvatar } from "antd";
import styled from "styled-components";
import { NAVIGATION_WIDTH } from "../layout/layout.styles";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  transition: background-color 0.25s;
  z-index: 9;

  &.open {
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: all;
  }
`;

export const Modal = styled.div`
  position: fixed;
  bottom: -430px;
  left: ${NAVIGATION_WIDTH + 10}px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 300px;
  padding: 15px;
  background-color: ${({ theme }) => theme.BG_FLOAT};
  box-shadow: rgba(0, 0, 0, 0.25) 0 1px 2px 0;
  border-radius: 5px;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  transition: transform 0.2s;
  z-index: 10;

  &.open {
    transform: translateY(-440px);
  }
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 5px -10px;
  padding: 5px 10px;
  border-radius: 5px;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.BG_FLOAT_HOVER};
  }
`;

export const Suboption = styled.div`
  display: flex;
  padding: 10px;

  background-color: ${({ selected, theme }) =>
    selected ? theme.BG_FLOAT_HOVER : "inherit"};
  border-radius: 5px;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.BG_FLOAT_HOVER};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-weight: 600;
`;

export const Description = styled.div`
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  opacity: 0.8;
  font-size: 9pt;
  line-height: 12pt;
  font-weight: 500;
`;

export const Email = styled.div`
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  opacity: 0.8;
  font-size: 10pt;
  font-weight: 500;
  margin: -5px 0 0 0;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Avatar = styled(AntAvatar)`
  background-color: ${({ theme }) => theme.BG400}; ;
`;

export const Header = styled.div`
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  display: flex;
  align-items: top;
  gap: 15px;
  margin: 10px 0 5px 0;
`;

export const Icon = styled.div`
  font-size: 15pt;
`;
