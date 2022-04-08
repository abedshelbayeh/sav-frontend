import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  top: -6px;
  right: -2px;

  & .anticon {
    font-size: 10pt;
    color: #096dd9;
  }
`;
