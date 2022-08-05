import { useState } from "react";
import { Button, Error, FormField, Input, Label } from "../styles";
import QRCodeDownloadButtons from "./QRCodeDownloadButtons";
import QRCodeElement from "./QRCodeElement";
import ReactMarkdown from "react-markdown";

function QRCodeForm(props) {
  const {
    qrCodeId,
    values,
    showPreview,
    onSubmit,
    onChange,
    isLoading
  } = props;

  const [title, setTitle] = useState(values?.title || 'Example');
  const [url, setUrl] = useState(values?.url || 'https://example.com');
  const [errors, setErrors] = useState(props.errors || []);

  return (
    <div>
      <div className="qr-code-form">
        <form onSubmit={onSubmit} onChange={onChange}>
          <input type="hidden" name="id" value={values.id} />
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="url">URL</Label>
            <Input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Save QR Code"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </div>
      {showPreview && (
        <div className="qr-code-preview">
          <h1>{title}</h1>
          <QRCodeElement data={url} />
          <ReactMarkdown>{url}</ReactMarkdown>
          <QRCodeDownloadButtons data={url} />
        </div>
      )}
    </div>
  );
}

export default QRCodeForm;
