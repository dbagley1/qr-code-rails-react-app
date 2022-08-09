import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label } from "../styles";

function UserAddUsersForm(props) {
  const {
    onSubmit,
    onChange,
  } = props;

  const [values, setValues] = useState(props.values || {});
  const [username, setUsername] = useState(values?.username || '');
  const [display_name, setDisplayName] = useState(values?.display_name || '');
  const [password, setPassword] = useState(values?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(values?.confirm_password || '');
  const [errors, setErrors] = useState(props.errors || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  useEffect(() => {
    setIsLoading(props.isLoading);
  }, [props.isLoading]);

  useEffect(() => {
    setValues(props.values);
  }, [props.values]);

  return (
    <div>
      <div style={{ width: "100%" }}>
        <form onSubmit={onSubmit} onChange={onChange}>
          <Label
            htmlFor="username"
          >Username: </Label>
          <Input
            id="username"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
          <Label
            htmlFor="display_name"
          >Display Name: </Label>
          <Input
            id="display_name"
            type="text"
            placeholder="Display Name"
            value={display_name}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="off"
          />
          <Label
            htmlFor="password"
          >New Password: </Label>
          <Input
            id="password"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <Label
            htmlFor="confirm_password"
          >Confirm New Password: </Label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
          />
          <FormField>
            <div style={{ display: "grid" }}>
              <Button project="primary" type="submit">
                {isLoading ? (<span>Loading...</span>) : (
                  <span>
                    Save Profile&nbsp;&nbsp;
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
      </div>
    </div >
  );
}

const UsersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  `;

const OwnerAvatar = styled.img`
  display: inline;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
`;

const InlineButton = styled.button`
  background: none;
  margin: 0 0.25rem;
  `;


export default UserAddUsersForm;
