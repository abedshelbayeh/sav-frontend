import styled from "styled-components";

export const Loading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const NotFound = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Back = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const Title = styled.div`
  width: 80%;

  & .ant-typography-edit-content {
    margin: -4px 0 11.5px 1px;
  }

  & .ant-input {
    border: none;
    box-shadow: none;
    height: unset;
    background-color: inherit;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 5px;
`;
