import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import UserSettings from "./user-settings.component";

// styles
import { Button } from "antd";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faBriefcase,
  faChartSimple,
  faUsers,
  faPlus,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./navigation.styles";

// actions
import { toggleEditBoard } from "../../redux/boards/boards.actions";

const Navigation = ({ setLayoutClass }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = useSelector(({ user: { user: { roles = [] } = {} } }) => roles);

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
  ];
  if (roles.includes("ADMIN")) {
    primaryActions.push(
      {
        id: "dashboards",
        title: "Dashboards",
        icon: <Icon icon={faChartSimple} />,
      },
      {
        id: "people",
        title: "People",
        icon: <Icon icon={faUsers} />,
      }
    );
  }

  const [{ id: defaultAction } = {}] = primaryActions;
  const [selectedAction, selectAction] = useState(defaultAction);

  const { pathname } = useLocation();
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
          <UserSettings setLayoutClass={setLayoutClass} />
        </Styled.Item>
      </Styled.Section>
    </Styled.Container>
  );
};

export default Navigation;
