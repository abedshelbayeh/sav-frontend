import styled from "styled-components";

import { Badge } from "antd";

import { GREY_BACKGROUND } from "../../style-variables";

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;

  & h2 {
    margin: 0 10px 0 0;
  }

  .ant-badge-count {
    background-color: ${GREY_BACKGROUND};
    color: black;
    font-weight: 500;
  }
`;

export const NumberOfParticipants = styled(Badge)`
  .ant-badge-count {
    background-color: ${GREY_BACKGROUND};
    color: black;
    font-weight: 500;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 3px;
  justify-content: flex-end;
`;
