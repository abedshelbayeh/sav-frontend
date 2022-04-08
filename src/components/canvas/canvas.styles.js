import styled from "styled-components";
import { Tag } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import {
  LIGHTBLUE_BACKGROUND,
  LIGHTGREY_BACKGROUND,
  LIGHTGREEN_BACKGROUND,
} from "../../style-variables";

export const Loading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  display: flex;
  margin: 5px -5px;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

// column
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  margin: 5px;
  background-color: ${({ isDragging }) =>
    isDragging ? LIGHTGREEN_BACKGROUND : "white"};
  transition: background-color ease 0.2s;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px 8px 0px 0px;
  transition: background-color ease 0.2s;
  font-weight: 600;
  font-size: 22px;

  &:hover {
    background-color: ${LIGHTGREEN_BACKGROUND};
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 5px;
  border-radius: 0 0 8px 8px;
  transition: background-color ease 0.2s;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? LIGHTGREEN_BACKGROUND : "inherit"};
`;

export const Empty = styled.div`
  color: gray;
  font-size: 10pt;
  text-align: center;
  margin: 30px;
`;

// card
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  background-color: ${({ isCardOwnedByUser }) =>
    isCardOwnedByUser ? LIGHTBLUE_BACKGROUND : LIGHTGREY_BACKGROUND};
  border-radius: 5px;
  padding: 10px 10px 5px 10px;
`;

export const Extra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0 0;
`;

export const Like = styled(Tag)`
  background-color: inherit;
  color: black;
  margin: 0;
  padding: 0;
  border: none;
  margin-left: auto;

  &::after {
    display: none;
  }
`;

export const Liked = styled(LikeFilled)`
  color: green;
`;

export const Unliked = styled(LikeOutlined)`
  color: grey;
`;
