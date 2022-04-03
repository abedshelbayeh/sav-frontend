import { Modal } from "antd";

const confirm = (name, onConfirm) => {
  Modal.confirm({
    icon: null,
    title: "Are you sure?",
    content: (
      <span>
        You're about to delete <strong>{name}</strong>! It can't be brought back
        once deleted, do you still want us to go ahead?
      </span>
    ),
    okText: "Yes",
    okType: "danger",
    okButtonProps: {
      type: "primary",
    },
    cancelText: "No",
    async onOk() {
      await onConfirm();
    },
  });
};

export default confirm;
