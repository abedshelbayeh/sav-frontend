import { Avatar as AntAvatar, Modal as AntModal } from "antd";
import styled from "styled-components";
import { NAVIGATION_WIDTH } from "../layout/layout.styles";

export const Modal = styled(AntModal)`
  position: fixed;
  left: ${NAVIGATION_WIDTH + 10}px;
  top: unset;
  bottom: 10px;
  width: 300px !important;
  padding: 0;

  & .ant-modal-body {
    background-color: ${({ theme }) => theme.BG_FLOAT};
    padding: 15px !important;
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.TEXT_PRIMARY};
    gap: 5px;
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
  background-color: ${({ theme }) => theme.BG400};
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
