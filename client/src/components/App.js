import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import QrCodeList from "../pages/QrCodeList";
import NewQrCode from "../pages/NewQrCode";

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
      <NavBar user={user} setUser={setUser} />
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

export default App;
