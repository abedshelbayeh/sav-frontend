import { Typography } from "antd";
import styled from "styled-components";
import {
  GREY_BACKGROUND,
  LIGHTGREY_BACKGROUND,
  LIGHTGREY_BACKGROUND_BORDER,
  SUBTITLE_COLOR,
  SUBTITLE_FONT_SIZE,
} from "../../style-variables";

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
  cursor: pointer;
`;

export const Title = styled(Typography.Title)`
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

  .ant-badge-count {
    background-color: ${GREY_BACKGROUND};
    color: black;
    font-weight: 500;
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
  padding: 5px 20px 5px 10px;
  background-color: ${LIGHTGREY_BACKGROUND};
  border: 1px solid ${LIGHTGREY_BACKGROUND_BORDER};
  border-radius: 5px;
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
