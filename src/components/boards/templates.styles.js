import styled from "styled-components";
import { Input, Typography } from "antd";

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 3;
  padding: 25px 0 20px 0;
  background-color: rgba(255, 255, 255, 0.9);
`;

export const Search = styled(Input.Search)`
  max-width: 50vw;

  @media screen and (max-width: 850px) {
    max-width: 90vw;
  }
`;

export const Loading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Title = styled(Typography.Title)`
  margin: 15px 0 0 0;
`;

export const Templates = styled.div`
  margin: 15px 0 25px 0;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
