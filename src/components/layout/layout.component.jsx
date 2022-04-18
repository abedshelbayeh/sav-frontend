import { useState } from "react";

// components
import EditBoard from "../boards/edit-board.component";
import Navigation from "../navigation/navigation.component";

// styles
import "antd/dist/antd.variable.css";
import * as Styled from "./layout.styles";

const Layout = ({ children }) => {
  const [layoutClass, setLayoutClass] = useState("");

  return (
    <Styled.Container className={layoutClass}>
      <EditBoard />
      <Navigation setLayoutClass={setLayoutClass} />
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
};

export default Layout;
