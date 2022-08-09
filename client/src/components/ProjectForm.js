import { useEffect, useState } from "react";
import { Button, Error, FormField, Input, Label } from "../styles";
import styled from "styled-components";

function ProjectForm(props) {
  const {
    qrCodeId,
    values,
    onSubmit,
    onChange,
    isLoading
  } = props;

  const [title, setTitle] = useState(values?.title || 'Example');
  const [errors, setErrors] = useState(props.errors || []);

  useEffect(() => {
    setErrors(props.errors || []);
  }, [props.errors]);

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
              required
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
                  <i className="fa fa-save fa-6" aria-hidden="true"></i>
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
