import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import QRCodeElement from "../components/QRCodeElement";

function QrCodeList() {
  const [qrCodes, setQrCodes] = useState([]);

  function deleteQrCode(id) {
    fetch(`/qr_codes/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setQrCodes(qrCodes.filter(qrCode => qrCode.id !== id));
      }
    });
  }

  useEffect(() => {
    fetch("/qr_codes")
      .then((r) => r.json())
      .then(setQrCodes);
  }, []);

  return (
    <Wrapper>
      {qrCodes.length > 0 ? (
        qrCodes.map((qrCode) => (
          <div key={qrCode.id}>
            <Box>
              <h2>{qrCode.title}</h2>
              <QRCodeElement data={qrCode.url} />
              <p>
                <a href={qrCode.url}>{qrCode.url}</a>
                &nbsp;·&nbsp;
                <cite>Created by {qrCode.user.username}</cite>
              </p>
              <button onClick={() => deleteQrCode(qrCode.id)}>Delete {qrCode.title}</button>
            </Box>
          </div>
        ))
      ) : (
        <>
          <h2>No QR Codes Found</h2>
          <Button as={Link} to="/new">
            Make a New QR Code
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default QrCodeList;
