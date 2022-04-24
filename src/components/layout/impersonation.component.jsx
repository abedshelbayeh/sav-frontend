import { useState } from "react";
import { useSelector } from "react-redux";
import { endImpersonation } from "../../interfaces/firebase";

// components
import notify from "../../utils/notification.util";

// styles
import { Button } from "antd";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUserNinja } from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./impersonation.styles";

const Impersonation = () => {
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("sav-impersonation-collapsed")) || false
  );

  const { name, impersonator } = useSelector(({ user: { user } }) => user);

  if (!impersonator) {
    return null;
  }

  const toggleCollapsed = () => {
    localStorage.setItem("sav-impersonation-collapsed", !collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <Styled.Bar className={collapsed ? "collapsed" : null}>
      <Styled.Impersonator
        onClick={() => {
          toggleCollapsed();
        }}
      >
        <Icon icon={faUserNinja} /> You're impersonating {name}, please take
        caution!
      </Styled.Impersonator>
      <Button
        type="text"
        onClick={async () => {
          try {
            await endImpersonation();
            window.location.href = "/mgmt";
          } catch (error) {
            const { message } = error?.response?.data || error;
            notify("error", "Something's not right!", message);
          }
        }}
      >
        End
      </Button>
    </Styled.Bar>
  );
};

export default Impersonation;
