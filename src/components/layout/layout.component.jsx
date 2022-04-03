import * as Styled from "./layout.styles";
import Navigation from "../navigation/navigation.component";

const Layout = ({ children }) => {
  return (
    <Styled.Container>
      <Navigation />
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
};

export default Layout;
