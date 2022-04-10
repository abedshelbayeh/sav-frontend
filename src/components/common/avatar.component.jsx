import stc from "string-to-color";
import { Avatar } from "antd";

const getInitials = (string = "") => {
  return string
    .split(" ")
    .map((n) => n[0])
    .join("");
};

const Initials = ({ children, ...rest }) => {
  return (
    <Avatar
      style={
        typeof children === "string"
          ? { backgroundColor: stc(children), color: "white" }
          : {}
      }
      {...rest}
    >
      {typeof children === "string" ? getInitials(children) : children}
    </Avatar>
  );
};

export default Initials;
