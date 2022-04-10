import { Typography } from "antd";
import styled from "styled-components";

export const Loading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  cursor: pointer;
`;

export const Title = styled(Typography.Title)`
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT} !important;
  margin: 0 !important;
`;

export const People = styled.div`
  width: 60%;
  margin: 25px 0 25px 0;

  @media screen and (max-width: 850px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0 10px 0;

  & h2 {
    margin: 0 10px 0 0;
  }
`;

export const Participants = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Participant = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.BACKGROUND_50};
  border-radius: 5px;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
`;

export const Subtitle = styled.div`
  font-size: 10pt;
  color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
  margin-top: -5px;
`;
