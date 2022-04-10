import styled from "styled-components";

import { Badge } from "antd";

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;

  & h2 {
    margin: 0 10px 0 0;
  }
`;

export const NumberOfParticipants = styled(Badge)``;

export const Actions = styled.div`
  display: flex;
  gap: 3px;
  justify-content: flex-end;
`;
