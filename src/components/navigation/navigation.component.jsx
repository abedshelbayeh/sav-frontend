import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../interfaces/firebase";

// components
import EditBoard from "../boards/edit-board.component";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import { ReactComponent as Moon } from "../../assets/moon.svg";

// styles
import {
  SettingFilled,
  UserOutlined,
  PlusOutlined,
  LogoutOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from "antd";
import * as Styled from "./navigation.styles";

// actions
import { toggleEditBoard } from "../../redux/boards/boards.actions";
import { setTheme } from "../../redux/user/user.actions";

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

const Navigation = ({ setLayloutClass }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [{ id: defaultAction } = {}] = primaryActions;
  const [selectedAction, selectAction] = useState(defaultAction);

  const theme = useSelector(({ user: { theme } }) => theme);

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
              <CaretDownOutlined />
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
        <Styled.SecondaryItem toggle>
          <Styled.Toggle
            defaultChecked={theme === "dark"}
            checkedChildren={<Moon />}
            unCheckedChildren={<Sun />}
            onChange={() => {
              setLayloutClass("disable-transition");
              dispatch(setTheme(theme === "light" ? "dark" : "light"));
              setTimeout(() => {
                setLayloutClass();
              }, 10);
            }}
          />
        </Styled.SecondaryItem>
        <Styled.SecondaryItem>
          <SettingFilled />
        </Styled.SecondaryItem>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="sign-out"
                onClick={() => handleNavigate(() => signOut())}
                icon={<LogoutOutlined />}
              >
                Signout
              </Menu.Item>
            </Menu>
          }
        >
          <Styled.SecondaryItem>
            <Avatar icon={<UserOutlined />} />
          </Styled.SecondaryItem>
        </Dropdown>
      </Styled.Section>
    </Styled.Container>
  );
};

export default Navigation;
