import styled from "styled-components";
import { Tag } from "antd";
import { DeleteOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";

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
  background-color: ${({ theme }) => theme.CANVAS_COLUMN_BACKGROUND};
  transition: background-color 0.25s ease;
  border-radius: 8px;
`;

export const Header = styled.div`
  color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px 8px 0px 0px;
  transition: background-color 0.25s ease;
  font-weight: 600;
  font-size: 22px;
  background-color: ${({ isDragging, theme }) =>
    isDragging ? theme.CANVAS_COLUMN_BACKGROUND_DRAGGING : "inherit"}}
  
  &:hover {
    background-color: ${({ theme }) => theme.CANVAS_COLUMN_BACKGROUND_DRAGGING};
  }
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
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
  transition: background-color 0.25s ease;
  background-color: ${({ isDraggingOver, theme }) =>
    isDraggingOver ? theme.CANVAS_COLUMN_BACKGROUND_DRAGGING : "inherit"};
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
  background-color: ${({ isCardOwnedByUser, theme }) =>
    isCardOwnedByUser
      ? theme.CANVAS_CARD_BACKGROUND_OWNED
      : theme.CANVAS_CARD_BACKGROUND};
  border-radius: 5px;
  padding: 10px 10px 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 1px 2px 0;
  -webkit-box-shadow: rgba(0, 0, 0, 0.15) 0 1px 2px 0;
`;

export const Extra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0 0;
`;

export const Like = styled(Tag)`
  background-color: inherit;
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  margin: 0;
  padding: 0;
  border: none;
  margin-left: auto;

  &::after {
    display: none;
  }
`;

export const Liked = styled(LikeFilled)`
  color: ${({ theme }) => theme.COLOR_POSITIVE};
`;

export const Unliked = styled(LikeOutlined)`
  color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
`;

export const Remove = styled(DeleteOutlined)`
  color: ${({ theme }) => theme.COLOR_DANGER};
`;
