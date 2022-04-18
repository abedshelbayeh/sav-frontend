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
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 850px) {
    width: 95%;
  }
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
  color: ${({ theme }) => theme.TEXT_PRIMARY};

  & .ant-typography-edit {
    margin: 0 0 0 10px;
  }

  & .ant-typography-edit-content {
    margin: -4px 0 11.5px 1px;
  }

  & .ant-input {
    border: none;
    box-shadow: none;
    height: unset;
    background: transparent !important;
    color: ${({ theme }) => theme.TEXT_PRIMARY};
    overflow: hidden;
  }
`;
