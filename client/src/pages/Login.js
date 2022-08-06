import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import QRCodeElement from "../components/QRCodeElement";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Main>
      <Wrapper>
        <QRCodeWrapper>
          <QRCodeElement url={"Welcome!"} color={'var(--g-blue-dark)'} />
        </QRCodeWrapper>
        <LogoWrapper>
          <Link to="/">
            <Logo>
              QR Code Manager
            </Logo>
          </Link>
        </LogoWrapper>
        {showLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <Divider />
            <p>
              Don't have an account? &nbsp;
              <Button color="secondary" onClick={() => setShowLogin(false)}>
                Sign Up
              </Button>
            </p>
          </>
        ) : (
          <>
            <SignUpForm onLogin={onLogin} />
            <Divider />
            <p>
              Already have an account? &nbsp;
              <Button color="secondary" onClick={() => setShowLogin(true)}>
                Log In
              </Button>
            </p>
          </>
        )}
      </Wrapper>
    </Main>
  );
}

const Logo = styled.h1`
  font-family: Poppins, Inter, Roboto, sans-serif;
  font-size: 2.75rem;
  font-weight: 600;
  margin: 0;
  line-height: 1;
  color: var(--g-blue-dark);
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const LogoWrapper = styled.div`
  margin: 1rem 0;
`;

const QRCodeWrapper = styled.div`
  margin: 1rem 0;
  overflow: hidden;
  border-radius: 5px;

  max-width: 100px;
  border: 5px solid white;
  box-sizing: content-box;
  width: 100%;
  margin: 0 auto;
  background-color: white;

  & svg {
  aspect-ratio: 1;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: var(--g-paleblue);
  `;


const Wrapper = styled.section`
  max-width: 500px;
  padding: 30px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 30px -10px #c1dbfb;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;
