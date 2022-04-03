import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../interfaces/firebase";

// components
import EditBoard from "../boards/edit-board.component";

// styles
import {
  SettingFilled,
  BellFilled,
  UserOutlined,
  PlusOutlined,
  DownCircleTwoTone,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from "antd";
import * as Styled from "./navigation.styles";

// actions
import { toggleEditBoard } from "../../redux/boards/boards.actions";

const primaryActions = [
  {
    id: "boards",
    title: "Boards",
  },
  {
    id: "your-work",
    title: "Your Work",
  },
  {
    id: "dashboards",
    title: "Dashboards",
  },
  {
    id: "people",
    title: "People",
  },
];

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [{ id: defaultAction } = {}] = primaryActions;
  const [selectedAction, selectAction] = useState(defaultAction);

  useEffect(() => {
    const [pathAction] = pathname.match("[^/]+") || [];
    selectAction(pathAction || defaultAction);
  }, [pathname, defaultAction]);

  const handleNavigate = (id) => {
    selectAction(id);
    navigate(`${id}`);
  };

  let actions = primaryActions.map(({ id, title }) => (
    <Styled.Item
      key={id}
      onClick={() => handleNavigate(id)}
      selected={id === selectedAction}
    >
      {title}
    </Styled.Item>
  ));

  let menu = primaryActions.map(({ id, title }) => (
    <Menu.Item
      key={id}
      onClick={() => handleNavigate(id)}
      selected={id === selectedAction}
    >
      {title}
    </Menu.Item>
  ));

  const { innerWidth } = window;
  return (
    <Styled.Container>
      <EditBoard />
      <Styled.Section>
        <Styled.Item>
          <Styled.Logo />
        </Styled.Item>
        {innerWidth >= 850 && actions}
        {innerWidth < 850 && (
          <Dropdown overlay={<Menu>{menu}</Menu>}>
            <Styled.Item>
              More
              <DownCircleTwoTone />
            </Styled.Item>
          </Dropdown>
        )}
        <Styled.Item button>
          <Button
            type="primary"
            onClick={() => dispatch(toggleEditBoard())}
            icon={innerWidth < 850 && <PlusOutlined />}
          >
            {innerWidth >= 850 && "Create"}
          </Button>
        </Styled.Item>
      </Styled.Section>
      <Styled.Section>
        <Styled.SecondaryItem>
          <BellFilled />
        </Styled.SecondaryItem>
        <Styled.SecondaryItem>
          <SettingFilled />
        </Styled.SecondaryItem>
        <Styled.SecondaryItem onClick={() => signOut()}>
          <Avatar icon={<UserOutlined />} />
        </Styled.SecondaryItem>
      </Styled.Section>
    </Styled.Container>
  );
};

export default Navigation;
