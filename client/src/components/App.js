import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import QrCodeList from "../pages/QrCodeList";
import NewQrCode from "../pages/NewQrCode";
import styled from "styled-components";

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
          <Route path="/new">
            <NewQrCode user={user} />
          </Route>
          <Route path="/">
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
`;

export default App;
