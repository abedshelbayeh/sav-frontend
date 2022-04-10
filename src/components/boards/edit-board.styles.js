import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

export const Stepper = styled.div`
  display: none;

  @media screen and (min-width: 850px) {
    margin: 50px 90px 0 0;
    background-color: inherit;
    z-index: 3;
    display: unset;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const Content = styled.div`
  width: 75%;

  @media screen and (max-width: 850px) {
    width: 100%;
  }
`;

export const Actions = styled.div`
  position: absolute;
  bottom: 0px;
  right: 25px;
  align-self: flex-end;
  padding: 0 0 25px 0;
`;
