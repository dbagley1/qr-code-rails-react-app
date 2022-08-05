import { useState } from "react";
import { Button, Error, FormField, Input, Label } from "../styles";
import QRCodeDownloadButtons from "./QRCodeDownloadButtons";
import QRCodeElement from "./QRCodeElement";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

function QRCodeForm(props) {
  const {
    user,
    qrCodeId,
    values,
    showPreview,
    onSubmit,
    onChange,
    isLoading
  } = props;

  const [title, setTitle] = useState(values?.title || 'Example');
  const [url, setUrl] = useState(values?.url || 'https://example.com');
  const [project, setProject] = useState(values?.project || '#000000');
  const [color, setColor] = useState(values?.project || '#000000');
  const [errors, setErrors] = useState(props.errors || []);

  return (
    <FormWrapper>
      <form onSubmit={onSubmit} onChange={onChange}>
        {qrCodeId && (
          <FormField>
            <Input type="hidden" id="id" value={qrCodeId} />
          </FormField>
        )}
        <FormField>
          <FieldGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FieldGroup>
        </FormField>
        <FormField>
          <FieldGroup>
            <Label htmlFor="url">URL</Label>
            <Input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </FieldGroup>
        </FormField>
        <FormField>
          <FieldGroup>
            <Label htmlFor="color">Color</Label>
            <ColorInputWrapper style={{ display: "flex", width: "100%" }}>
              <Input
                type="text"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <Input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </ColorInputWrapper>
          </FieldGroup>
        </FormField>
        <FormField>
          <FieldGroup>
            <Label htmlFor="project">Project</Label>
            <select
              id="project"
              value={null}
              onChange={(e) => setProject(e.target.value)}
            >
              <option>No Project</option>
              {user?.projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </FieldGroup>
        </FormField>
        <FormField>
          <div style={{ display: "grid" }}>
            <Button project="primary" type="submit">
              {isLoading ? (<span>Loading...</span>) : (
                <span>
                  Save QR Code&nbsp;&nbsp;
                  <i class="fa fa-save fa-6" aria-hidden="true"></i>
                </span>
              )}
            </Button>
          </div>
        </FormField>
        <FormField>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </FormField>
      </form>
    </FormWrapper>
  );
}

const ColorInputWrapper = styled.div`
  display: flex;
  flex-direction: row nowrap;
  align-items: center;

  & input {
    flex: 1;
    margin: 0;
    height: 100%;
  }

  & input[type='project'] {
    flex 0 0 0;
    min-width: 40px;
    -webkit-appearance: none;
    cursor: pointer;
    aspect-ratio: 1;
    padding: 0;
    border: none;
    background: none;
    margin: -10px 0;
  }

  input[type="project"]::-webkit-project-swatch-wrapper {
    padding: 0;
  }
  input[type="project"]::-webkit-project-swatch {
    border: none;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & input {
    margin: 0;
  }

  & label {
    overflow-wrap: normal;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
`;

export default QRCodeForm;
