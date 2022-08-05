import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import QRCodeElement from "../components/QRCodeElement";
import QRCodeForm from "../components/QRCodeForm";
import QRCodeDownloadButtons from "../components/QRCodeDownloadButtons";

function QrCodeList() {
  const [qrCodes, setQrCodes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

  function deleteQrCode(qrCode) {
    const { id, title } = qrCode;

    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      fetch(`/qr_codes/${id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          setQrCodes(qrCodes.filter(qrCode => qrCode.id !== id));
        }
      });
    }
  }

  useEffect(() => {
    fetch("/qr_codes")
      .then((r) => r.json())
      .then(setQrCodes);
  }, []);

  function editQrCode(qrCode) {
    setEditId(qrCode.id);
    setFormData({ ...qrCode });
  }

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    fetch(`/qr_codes/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setQrCodes(qrCodes.map(qrCode => qrCode.id === editId ? data : qrCode));
        setEditId(null);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function closeEditForm() {
    setEditId(null);
    setFormData({});
  }

  return (
    <Wrapper>
      {qrCodes.length > 0 ? (
        qrCodes.map((qrCode) => (
          <QRCodeItem key={qrCode.id}>
            {editId !== qrCode.id ? (<Box>
              <SVGContainer>
                <QRCodeElement url={qrCode.url} color={qrCode.color} containerId={'qr-svg-' + qrCode.id} />
              </SVGContainer>
              <QRDetails>
                <div>
                  <h2>{qrCode.title}</h2>
                  <p>
                    <span style={{ color: "rgb(0,0,238)" }}>{qrCode.url}</span>
                  </p>
                </div>
                <QRItemButtonGroup>
                  <QRItemButton onClick={() => deleteQrCode(qrCode)}>Delete</QRItemButton>
                  <QRItemButton onClick={() => editQrCode(qrCode)}>Edit</QRItemButton>
                  <QRCodeDownloadButtons svgSelector={'#qr-svg-' + qrCode.id + ' svg'} label={'SVG'} fileName={qrCode.title} />
                </QRItemButtonGroup>
              </QRDetails>
            </Box>) :
              (<Box>
                <SVGContainer>
                  <QRCodeElement url={formData.url || qrCode.url} />
                </SVGContainer>
                <QRDetails>
                  <QRCodeForm onChange={updateFormData} onSubmit={handleEditSubmit} showPreview={false} values={formData} />
                  <div>
                    <QRItemButtonGroup>
                      <QRItemButton onClick={() => closeEditForm()}>Cancel</QRItemButton>
                      <QRItemButton onClick={() => deleteQrCode(qrCode)}>Delete</QRItemButton>
                    </QRItemButtonGroup>
                  </div>
                </QRDetails>
              </Box>)
            }
          </QRCodeItem>
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
  margin: 0 auto;
`;

const QRCodeItem = styled.div`
  & > div {
    display: flex;
    flex-flow: row wrap;
    padding: 30px;
    gap: 30px;
    justify-content: start;

    @media only screen and (max-width: 500px) {
      justify-content: center;
    }
  }
`;

const QRItemButton = styled.button`
  span {
    display: none;
  }

  &:hover {
    span {
      display: inline;
    }
  }
  `;

const SVGContainer = styled.div`
  flex: 1 1 0;
  max-width: 200px;

  @media only screen and (max-width: 500px) {
    max-width: 150px;
  }
`;

const QRDetails = styled.div`
  flex: 1 1 50%;
  overflow-wrap: anywhere;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;

  @media only screen and (max-width: 500px) {
    text-align: center;
    flex-basis: 100%;
  }
  `;

const QRItemButtonGroup = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 10px;
`;

export default QrCodeList;
