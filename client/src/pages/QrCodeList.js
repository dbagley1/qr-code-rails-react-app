import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import QRCodeListCards from "../components/QRCodeListCards";

function QrCodeList() {
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    fetch("/qr_codes")
      .then((r) => r.json())
      .then(setQrCodes);
  }, []);

  return (
    <Wrapper>
      <Button as={Link} to="/new-qr-code">
        Create New QR Code
      </Button>
      <QRCodeListCards qrCodes={qrCodes} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  padding: 15px;

  & > div {
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0 0 1px rgb(10 10 10 / 2%);
  }
`;

export default QrCodeList;
