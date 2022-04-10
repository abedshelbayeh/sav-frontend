import { CheckCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";
import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  height: 240px;
  width: 240px;
  background-color: ${({ theme }) => theme.BACKGROUND_50};
  border: ${({ selected, theme }) =>
    selected ? `1px solid ${theme.COLOR_POSITIVE}` : `none`};
  border-radius: 15px;

  @media screen and (max-width: 850px) {
    height: 200px;
    width: 200px;
  }
`;

export const Cover = styled.div`
  position: absolute;
  background-image: url(${({ image }) => image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: auto;
  top: 40px;
  bottom: 40px;
  left: 40px;
  right: 40px;
  border-radius: 15px;

  @media screen and (max-width: 850px) {
    top: 20px;
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 15px;
  opacity: 0;
  background-color: ${({ theme }) => theme.BACKGROUND_50};
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  border-radius: 15px;
  transition: opacity 0.45s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;

  :hover {
    opacity: 0.9;
  }

  @media screen and (max-width: 850px) {
    font-size: 8pt;
  }
`;

export const Selected = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  opacity: ${({ selected }) => (selected ? 1 : 0)};
`;

export const Actions = styled.div`
  align-self: flex-end;
`;

export const SelectedIcon = styled(CheckCircleFilled)`
  font-size: 25px;
  color: ${({ theme }) => theme.COLOR_POSITIVE};
`;

export const Title = styled(Typography.Title)`
  margin: 5px;
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
`;
