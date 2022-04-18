import styled from "styled-components";
import { Input } from "antd";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const Search = styled(Input.Search)`
  width: 60%;

  @media screen and (max-width: 850px) {
    width: 95%;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 3px;
  justify-content: flex-end;
`;
