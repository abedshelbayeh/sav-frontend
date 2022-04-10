import styled from "styled-components";
import { Button } from "antd";

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;

  & h2 {
    margin: 0 10px 0 0;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Subtitle = styled.div`
  font-size: 10pt;
  color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
  margin-top: -5px;
`;

export const InviteAnotherButton = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.BACKGROUND_200} !important;
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  border: ${({ theme }) => `1px dashed ${theme.COLOR_SECONDARY_TEXT}`};

  :hover {
    background-color: ${({ theme }) => theme.BACKGROUND_100} !important;
  }
`;
