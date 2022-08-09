import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <Link to="/">
          <Logo>
            QR Code Manager
          </Logo>
        </Link>
      </LogoWrapper>
      <Nav>
        <Button as={Link} to="/projects">
          Projects
        </Button>
        <Button as={Link} to="/">
          QR Codes
        </Button>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
        <div style={{
          aspectRatio: "1", borderRadius: "50%", height: "42px", overflow: "hidden"
        }}>
          <Link to="/profile"><img src={user.image_url} alt="profile" style={{ width: "100%" }} /></Link>
        </div>
      </Nav>
      <AccountBar>
        <p>
          Logged in as&nbsp;
          <span style={{ fontWeight: "bold", color: "var(--g-blue)" }}>{user.username}</span>.
          Not you?&nbsp;
          <span style={{ cursor: "pointer", color: "var(--g-blue-dark)", textDecoration: "underline" }} onClick={handleLogoutClick}>
            Logout
          </span>
        </p>
      </AccountBar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-flow: column;
    gap: 10px;
    & > * {
      width: 100%;
      text-align: center;
    }
  }
`;

const Logo = styled.h1`
  font-family: Poppins, Inter, Roboto, sans-serif;
  font-size: 2.25rem;
  font-weight: 600;
  margin: 0;
  line-height: 1;
  color: var(--g-blue-dark);

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const LogoWrapper = styled.div`

`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const AccountBar = styled.div`
  width: 100%;
`;

export default NavBar;
