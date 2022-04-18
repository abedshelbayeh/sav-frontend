import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../interfaces/firebase";

// styles
import { Button, Dropdown, Menu } from "antd";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faBriefcase,
  faChartSimple,
  faUsers,
  faCircleHalfStroke,
  faPlus,
  faUser,
  faBell,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./navigation.styles";

// actions
import { toggleEditBoard } from "../../redux/boards/boards.actions";
import { setTheme } from "../../redux/user/user.actions";

const primaryActions = [
  {
    id: "boards",
    title: "Boards",
    icon: <Icon icon={faChalkboard} />,
  },
  {
    id: "your-work",
    title: "Your Work",
    icon: <Icon icon={faBriefcase} />,
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Icon icon={faChartSimple} />,
  },
  {
    id: "people",
    title: "People",
    icon: <Icon icon={faUsers} />,
  },
];

const Navigation = ({ setLayoutClass }) => {
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

  const actions = primaryActions.map(({ id, icon }) => (
    <Styled.Item
      key={id}
      onClick={() => handleNavigate(id)}
      selected={id === selectedAction}
    >
      <Styled.Icon>{icon}</Styled.Icon>
    </Styled.Item>
  ));

  return (
    <Styled.Container>
      <Styled.Section>
        <Styled.Item>
          <Styled.Logo />
        </Styled.Item>
        {actions}
        <Styled.Item>
          <Button
            type="primary"
            shape="circle"
            onClick={() => dispatch(toggleEditBoard())}
            icon={<Icon icon={faPlus} />}
          ></Button>
        </Styled.Item>
      </Styled.Section>
      <Styled.Section>
        <Styled.Item>
          <Icon icon={faBell} />
        </Styled.Item>
        <Styled.Item>
          <Dropdown
            placement="right"
            overlay={
              <Menu>
                <Menu.Item
                  key="sign-out"
                  onClick={() => signOut()}
                  icon={<Icon icon={faRightFromBracket} />}
                >
                  Sign out
                </Menu.Item>
              </Menu>
            }
          >
            <Styled.Avatar icon={<Icon icon={faUser} />} />
          </Dropdown>
        </Styled.Item>
        <Styled.Item
          onClick={() => {
            setLayoutClass("disable-transition");
            dispatch(setTheme(theme === "light" ? "dark" : "light"));
            setTimeout(() => {
              setLayoutClass();
            }, 100);
          }}
        >
          <Icon icon={faCircleHalfStroke} />
        </Styled.Item>
      </Styled.Section>
    </Styled.Container>
  );
};

export default Navigation;
