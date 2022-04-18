import styled from "styled-components";
import { Button, Input } from "antd";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const Search = styled(Input.Search)`
  width: 60%;

  @media screen and (max-width: 850px) {
    width: 95%;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Subtitle = styled.div`
  font-size: 10pt;
  color: ${({ theme }) => theme.TEXT_SECONDARY};
  margin-top: -5px;
`;

export const InviteAnotherButton = styled(Button)`
  width: 100%;
  background: transparent !important;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  border: ${({ theme }) => `1px dashed ${theme.BG400}`} !important;

  & span {
    margin: 0 10px;
  }
`;
