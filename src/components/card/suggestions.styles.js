import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  padding: 0;
  background: ${({ theme }) => theme.BG_FLOAT};
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 29px 0px;
  overflow: hidden;
`;

export const Item = styled.div`
  color: ${({ theme }) => theme.TEXT_PRIMARY};
  background-color: ${({ selected, theme }) =>
    selected ? theme.BG_FLOAT_HOVER : "transparent"};
  cursor: pointer;
  padding: 2px 20px 2px 5px;

  &:hover {
    background-color: ${({ theme }) => theme.BG_FLOAT_HOVER};
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px;
`;

export const Subtitle = styled.div`
  font-size: 10pt;
  color: ${({ theme }) => theme.TEXT_SECONDARY};
  margin-top: -5px;
`;
