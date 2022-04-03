import styled from "styled-components";

export const NAVIGATION_HEIGHT = 50;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin-top: ${NAVIGATION_HEIGHT}px;
  padding: 30px 0;
  width: 100%;

  @media screen and (max-width: 850px) {
    padding: 15px 0;
  }
`;
