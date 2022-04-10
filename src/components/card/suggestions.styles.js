import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  padding: 0;
  background: ${({ theme }) => theme.BACKGROUND_200};
  border: 1px solid ${({ theme }) => theme.COLOR_SOLID_BORDER};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 29px 0px;
  overflow: hidden;
`;

export const Item = styled.div`
  color: ${({ theme }) => theme.COLOR_PRIMARY_TEXT};
  background-color: ${({ selected, theme }) =>
    selected ? theme.BACKGROUND_TRANSPARENT_OVERLAY : "transparent"};
  cursor: pointer;
  padding: 2px 20px 2px 5px;

  &:hover {
    background-color: ${({ theme }) => theme.BACKGROUND_TRANSPARENT_OVERLAY};
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
  color: ${({ theme }) => theme.COLOR_SECONDARY_TEXT};
  margin-top: -5px;
`;
