import styled from "styled-components";
import { Tag } from "antd";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";

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
  background-color: ${({ theme }) => theme.BG_CANVAS_COLUMN};
  transition: background-color 0.25s ease;
  border-radius: 2px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
`;

export const Header = styled.div`
  color: ${({ theme }) => theme.TEXT_SECONDARY};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 11px 10px 13px;
  border-radius: 2px 2px 0px 0px;
  transition: background-color 0.25s ease;
  font-weight: 600;
  font-size: 18pt;
  background-color: ${({ isDragging, theme }) =>
    isDragging ? theme.BG_CANVAS_COLUMN_DRAGGING : "inherit"}}
  
  &:hover {
    background-color: ${({ theme }) => theme.BG_CANVAS_COLUMN_DRAGGING};
  }
`;

export const AddCard = styled(Icon)`
  cursor: ${({ onClick }) => (!!onClick ? "pointer" : "unset")};
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12pt;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 5px;
  border-radius: 0 0 2px 2px;
  transition: background-color 0.25s ease;
  background-color: ${({ isDraggingOver, theme }) =>
    isDraggingOver ? theme.BG_CANVAS_COLUMN_DRAGGING : "inherit"};
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
  margin: 6px 5px;
  background-color: ${({ theme }) => theme.BG_CANVAS_CARD};
  border-left: ${({ isCardOwnedByUser, theme }) =>
    isCardOwnedByUser ? `2px solid ${theme.primaryColor}` : "none"};
  border-radius: 2px;
  padding: 10px 10px 5px 10px;

  &.blurred .card-text {
    filter: blur(5px);
    -webkit-filter: blur(5px);
    user-select: none;
    -webkit-user-select: none;
  }
`;

export const Extra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0 0;
`;

export const Like = styled(Tag)`
  background-color: inherit;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  margin: 0;
  padding: 0;
  border: none;
  margin-left: auto;

  &::after {
    display: none;
  }

  & span {
    margin: 0 !important;
  }
`;

export const Likes = styled.div`
  margin: 0 0 0 4px;
  display: inline;
`;

export const Liked = styled(LikeFilled)`
  color: ${({ theme }) => theme.COLOR_POSITIVE};
`;

export const Unliked = styled(LikeOutlined)`
  color: ${({ theme }) => theme.TEXT_SECONDARY};
`;

export const Remove = styled(Icon)`
  cursor: ${({ onClick }) => (!!onClick ? "pointer" : "unset")};
  color: ${({ theme }) => theme.COLOR_DANGER};
`;

// sidebar
export const Sidebar = styled.div`
  position: fixed;
  top: 15px;
  right: 15px;
  display: flex;
  pointer-events: none;
`;
