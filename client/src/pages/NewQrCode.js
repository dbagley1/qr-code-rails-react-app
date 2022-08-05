import { useRef, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";
import QRCodeElement from "../components/QRCodeElement";
import QRCodeDownloadButtons from "../components/QRCodeDownloadButtons";
import QRCodeForm from "../components/QRCodeForm";

function NewQRCode({ user }) {
  let now = new Date();
  let dateString = now.toLocaleString('en-US', { month: "numeric", day: "numeric" }).replace(/[\s/]/g, '-');
  let timeString = now.toLocaleString('en-US', { hour: "numeric", minute: "numeric" });

  const [formData, setFormData] = useState({
    title: `QR Code ${dateString} ${timeString}`,
    url: "https://www.example.com",
  });


  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const qrElement = useRef(null);

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleFormSubmit(e) {
    let { title, url } = formData;

    e.preventDefault();
    setIsLoading(true);
    fetch("/qr_codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        url
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create a QR Code</h2>
        <QRCodeForm onChange={updateFormData} onSubmit={handleFormSubmit} showPreview={false} values={formData} isLoading={isLoading} />
      </WrapperChild>
      <WrapperChild>
        {JSON.stringify(formData)}
        <h1>{formData.title}</h1>
        <ReactMarkdown>{formData.url}</ReactMarkdown>
        <QRCodeElement data={formData.url} containerId={"new-qr-preview-svg"} />
        <QRCodeDownloadButtons svgSelector={"#new-qr-preview-svg svg"} fileName={formData.title} />
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewQRCode;
