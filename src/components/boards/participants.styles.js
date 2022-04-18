import styled from "styled-components";
import { Badge, Select, Typography } from "antd";

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
  margin: 25px 0 0 0;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  cursor: pointer;
`;

export const Title = styled(Typography.Title)`
  color: ${({ theme }) => theme.TEXT_PRIMARY};
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
  background-color: ${({ theme }) => theme.BG_CARD};
  border-radius: 2px;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
`;

export const Subtitle = styled.div`
  font-size: 10pt;
  color: ${({ theme }) => theme.TEXT_SECONDARY};
  margin-top: -5px;
`;

export const Count = styled(Badge)`
  & .ant-badge-count {
    background-color: ${({ theme }) => theme.primaryColor};
    box-shadow: none !important;
  }
`;

export const Search = styled(Select)`
  width: 100%;
`;
