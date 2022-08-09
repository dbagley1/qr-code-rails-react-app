import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import QrCodeList from "../pages/QrCodeList";
import NewQrCode from "../pages/NewQrCode";
import styled from "styled-components";
import ProjectList from "../pages/ProjectList";
import NewProject from "../pages/NewProject";
import Profile from "../pages/Profile";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  function updateUserCallback(user) {
    setUser(user);
  }

  return (
    <>
      <AppWrapper>
        <Header>
          <NavBar user={user} setUser={setUser} />
        </Header>
        <Main>
          <Switch>
            <Route path="/" exact>
              <QrCodeList user={user} />
            </Route>
            <Route path="/projects">
              <ProjectList user={user} />
            </Route>
            <Route path="/new-project">
              <NewProject user={user} />
            </Route>
            <Route path="/new-qr-code">
              <NewQrCode user={user} />
              <QrCodeList user={user} />
            </Route>
            <Route path="/profile">
              <Profile user={user} updateUserCallback={updateUserCallback} />
            </Route>
          </Switch>
        </Main>
      </AppWrapper>
    </>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  padding: 20px;
  gap: 20px;
  background-color: #fff;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
  `;

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  `;

export default App;
