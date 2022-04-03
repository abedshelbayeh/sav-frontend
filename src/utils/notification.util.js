import { notification } from "antd";

const notify = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export default notify;
