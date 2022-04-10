import { useDispatch, useSelector } from "react-redux";

// styles
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import * as Styled from "./people.styles";

// actions
import { toggleInvitePeople } from "../../redux/people/people.actions";

const InvitePeople = () => {
  const dispatch = useDispatch();

  const { visible, loading } = useSelector(({ people: { modal } }) => modal);

  const [form] = Form.useForm();
  return (
    <Modal
      title="Invite people to Savvy"
      visible={visible}
      okText="Invite"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log("Submitting values:", values);
          })
          .catch((validation) => {
            console.log("Invalid values:", validation);
          });
      }}
      okButtonProps={{ loading }}
      onCancel={() => dispatch(toggleInvitePeople())}
      destroyOnClose
    >
      <Form
        preserve={false}
        form={form}
        initialValues={{ emailAddresses: [""] }}
      >
        <Form.List name="emailAddresses">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Form.Item key={field.key}>
                  <Form.Item
                    {...field}
                    required={true}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      size="large"
                      placeholder="Email address"
                      suffix={
                        fields.length > 1 && (
                          <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            style={{ width: "100%", height: "100%" }}
                            onClick={() => remove(field.name)}
                          />
                        )
                      }
                    />
                  </Form.Item>
                </Form.Item>
              ))}
              <Form.Item>
                <Styled.InviteAnotherButton
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "100%" }}
                  icon={<PlusOutlined />}
                >
                  Invite another person
                </Styled.InviteAnotherButton>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default InvitePeople;
