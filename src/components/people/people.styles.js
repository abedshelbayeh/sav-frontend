import styled from "styled-components";

import { Button } from "antd";

import {
  GREY_BACKGROUND,
  SUBTITLE_FONT_SIZE,
  SUBTITLE_COLOR,
} from "../../style-variables";

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

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Subtitle = styled.div`
  font-size: ${SUBTITLE_FONT_SIZE};
  color: ${SUBTITLE_COLOR};
  margin-top: -5px;
`;

export const InviteAnotherButton = styled(Button)`
  width: 100%;
`;
