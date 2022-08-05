import { useState } from "react";
import { Button, Error, FormField, Input, Label } from "../styles";
import styled from "styled-components";

function ProjectForm(props) {
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
  const [color, setColor] = useState(values?.color || '#000000');
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
          <div style={{ display: "grid" }}>
            <Button color="primary" type="submit">
              {isLoading ? (<span>Loading...</span>) : (
                <span>
                  Save Project&nbsp;&nbsp;
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

  & input[type='color'] {
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

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
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

export default ProjectForm;
