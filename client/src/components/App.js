import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import QrCodeList from "../pages/QrCodeList";
import NewQrCode from "../pages/NewQrCode";
import styled from "styled-components";
import ProjectList from "../pages/ProjectList";
import NewProject from "../pages/NewProject";

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

  return (
    <>
      <Header>
        <NavBar user={user} setUser={setUser} />
      </Header>
      <main>
        <Switch>
          <Route path="/" exact>
            <QrCodeList />
          </Route>
          <Route path="/projects">
            <ProjectList />
          </Route>
          <Route path="/new-project">
            <NewProject user={user} />
          </Route>
          <Route path="/new-qr-code">
            <NewQrCode user={user} />
            <QrCodeList />
          </Route>
        </Switch>
      </main>
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

export default App;
