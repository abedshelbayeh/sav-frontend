import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../interfaces/firebase";

// styles
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faScrewdriverWrench,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./user-settings.styles";

// actions
import { setTheme } from "../../redux/user/user.actions";

const themeOptions = [
  {
    key: "dark",
    title: "On",
    description: "",
  },
  {
    key: "light",
    title: "Off",
    description: "",
  },
  {
    key: "system",
    title: "Automatic",
    description:
      "We'll adjust colors automatically based on your device's system settings.",
  },
];

const UserSettings = ({ setLayoutClass }) => {
  const dispatch = useDispatch();

  const { theme, user: { name, email, roles } = {} } = useSelector(
    ({ user }) => user
  );

  const [open, setOpen] = useState(false);

  const themes = themeOptions.map(({ key, title, description }) => (
    <div
      key={key}
      onClick={() => {
        setLayoutClass("disable-transition");
        dispatch(setTheme(key));
        setTimeout(() => {
          setLayoutClass();
        }, 100);
      }}
    >
      <Styled.Suboption selected={theme === key}>
        <Styled.Content>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Description>{description}</Styled.Description>
        </Styled.Content>
      </Styled.Suboption>
    </div>
  ));

  const actionOptions = [
    {
      key: "sign-out",
      title: "Sign Out",
      icon: faRightFromBracket,
      onClick: () => signOut(),
    },
  ];
  if (roles.includes("SAV-OPS")) {
    actionOptions.push({
      key: "operations-dashboard",
      title: "Operations Dashboard",
      icon: faScrewdriverWrench,
      onClick: () => (window.location.href = "/mgmt"),
    });
  }

  const actions = actionOptions.map(({ key, title, icon, onClick }) => (
    <Styled.Option key={key} onClick={onClick}>
      <Styled.Icon>
        <Icon icon={icon} />
      </Styled.Icon>
      <Styled.Content>
        <Styled.Title>{title}</Styled.Title>
      </Styled.Content>
    </Styled.Option>
  ));

  return (
    <>
      <Styled.Modal
        visible={open}
        footer={null}
        closable={false}
        onCancel={() => setOpen(!open)}
      >
        <Styled.User>
          <Styled.Avatar icon={<Icon icon={faUser} />} />
          <Styled.Content>
            <Styled.Title>{name}</Styled.Title>
            <Styled.Email>{email}</Styled.Email>
          </Styled.Content>
        </Styled.User>
        {actions}
        <Styled.Header>
          <Styled.Icon>
            <Icon icon={faMoon} />
          </Styled.Icon>
          <Styled.Content>
            <Styled.Title>Dark Mode</Styled.Title>
            <Styled.Description>
              Adjust the appearance of the app to reduce glare and give your
              eyes a break.
            </Styled.Description>
          </Styled.Content>
        </Styled.Header>
        {themes}
      </Styled.Modal>
      <Styled.Avatar
        icon={<Icon icon={faUser} />}
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export default UserSettings;
