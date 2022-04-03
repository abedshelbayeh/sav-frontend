import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./interfaces/firebase";
import { onAuthStateChanged } from "firebase/auth";

// components
import Layout from "./components/layout/layout.component";
import PeoplePage from "./pages/people/people-page.component";
import BoardsPage from "./pages/boards/boards-page.component";
import BoardPage from "./pages/boards/board-page.component";

// actions
import { authenticationStart, setUser } from "./redux/user/user.actions";

// styles
import { Result } from "antd";
import styled from "styled-components";

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

  const { loading, user } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(authenticationStart());
    const subscription = onAuthStateChanged(auth, (user) =>
      dispatch(setUser(user))
    );
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
  );
}

export default App;
