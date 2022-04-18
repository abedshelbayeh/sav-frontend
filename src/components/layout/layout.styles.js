import styled from "styled-components";

export const NAVIGATION_WIDTH = 55;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 0 ${NAVIGATION_WIDTH}px;
  flex-grow: 1;
  padding: 20px 25px;

  @media screen and (max-width: 850px) {
    padding: 20px 0;
  }
`;
