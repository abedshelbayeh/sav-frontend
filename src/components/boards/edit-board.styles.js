import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 850px) {
    position: sticky;
    height: 92vh;
    top: 0;
    justify-content: space-between;
  }
`;

export const Stepper = styled.div`
  display: none;

  @media screen and (min-width: 850px) {
    margin: 50px 50px 0 0;
    display: unset;
  }
`;

export const Content = styled.div`
  width: 75%;

  @media screen and (max-width: 850px) {
    width: 100%;
  }
`;

export const Actions = styled.div`
  align-self: flex-end;
  padding: 0 0 25px 0;
`;
