import styled from "styled-components";

export const Bar = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  min-height: 40px;
  background-color: ${({ theme }) => theme.BG_IMPERSONATION};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  padding: 5px 10px;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  transition: transform 0.2s;
  z-index: 2000;

  & .ant-btn {
    color: white;
    font-weight: 600;
  }

  &.collapsed {
    transform: translateX(96%);
  }
`;

export const Impersonator = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;
