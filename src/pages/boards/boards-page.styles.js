import styled from "styled-components";

export const Container = styled.div`
  width: 70%;

  @media screen and (max-width: 850px) {
    width: 95%;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0 0 20px 0;
  font-size: 16pt;
  font-weight: 600;
  color: ${({ theme }) => theme.TEXT_PRIMARY};
`;
