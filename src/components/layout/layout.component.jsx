import * as Styled from "./layout.styles";
import Navigation from "../navigation/navigation.component";

// styles
import "antd/dist/antd.variable.css";
import { useState } from "react";

const Layout = ({ children }) => {
  const [layoutClass, setLayloutClass] = useState("");

  return (
    <Styled.Container className={layoutClass}>
      <Navigation setLayloutClass={setLayloutClass} />
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
};

export default Layout;
