import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./interfaces/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useMediaQuery } from "react-responsive";

// components
import Layout from "./components/layout/layout.component";
import PeoplePage from "./pages/people/people-page.component";
import BoardsPage from "./pages/boards/boards-page.component";
import BoardPage from "./pages/boards/board-page.component";

// actions
import { authenticationStart, setUser } from "./redux/user/user.actions";

// styles
import { ConfigProvider, Result } from "antd";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import * as themes from "./themes";
import GlobalStyle from "./global-styles";

const Message = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Construction = () => (
  <Message>
    <Result
      title="It shouldn't be too long now!"
      subTitle="We're working very hard to make this feature available to you soon."
    />
  </Message>
);

function App() {
  const dispatch = useDispatch();

  let { loading, user, theme } = useSelector(({ user }) => user);

  const systemPrefersDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  if (theme === "system") {
    theme = systemPrefersDark ? "dark" : "light";
  }

  ConfigProvider.config({
    theme: themes[theme],
  });

  useEffect(() => {
    dispatch(authenticationStart());
    const subscription = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const {
          claims: { _clientId, userId, name, roles = [], impersonator } = {},
        } = await user.getIdTokenResult();
        dispatch(
          setUser(
            roles.length
              ? { ...user, _clientId, userId, name, roles, impersonator }
              : null
          )
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return () => {
      subscription();
    };
  }, [dispatch]);

  if (loading) {
    return null;
  }

  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <ConfigProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<BoardsPage />} />
            <Route exact path="/your-work" element={<Construction />} />
            <Route exact path="/boards" element={<BoardsPage />} />
            <Route exact path="/boards/:boardId" element={<BoardPage />} />
            <Route exect path="/dashboards" element={<Construction />} />
            <Route exact path="/people" element={<PeoplePage />} />
          </Routes>
        </Layout>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
