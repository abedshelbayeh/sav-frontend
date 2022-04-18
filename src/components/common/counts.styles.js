import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 60px;
`;

export const Count = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  color: ${({ theme }) => theme.TEXT_PRIMARY};

  & .count {
    font-size: 24pt;
    margin: -5px 0 0 -4px;
    line-height: 24pt;
    font-weight: 600;
    color: ${({ theme }) => theme.primaryColor};
  }
`;
