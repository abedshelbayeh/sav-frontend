import styled from "styled-components";
import { Input } from "antd";

export const Container = styled.div`
  width: 60%;

  @media screen and (max-width: 850px) {
    width: 95%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px 0;
  gap: 5px;
`;

export const Search = styled(Input.Search)`
  width: 60%;

  @media screen and (max-width: 850px) {
    width: 95%;
  }
`;
