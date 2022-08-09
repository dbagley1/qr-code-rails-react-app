import { useState } from "react";
import { Button, Error, FormField, Input, Label } from "../styles";
import styled from "styled-components";
import { useEffect } from "react";
import ProfileForm from "../components/ProfileForm";

function Profile(props) {
  const { updateUserCallback } = props;

  const [user, setUser] = useState(props.user || {});
  const [formData, setFormData] = useState({ ...user } || {});
  const [errors, setErrors] = useState(props.errors || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleFormSubmit(e) {
    let { username, display_name, password, confirm_password } = formData;

    e.preventDefault();
    setIsLoading(true);
    fetch(`/users/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        display_name,
        password,
        confirm_password
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((data) => {
          updateUserCallback(data);
          setUser(data);
          setErrors([]);
          setFormData({
            ...formData,
            password: "",
            confirm_password: "",
          });
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
      .catch((err) => {
        setErrors(err.errors);
      });
  }

  return (
    <Background>
      <Wrapper>
        <ProfileForm onSubmit={handleFormSubmit} onChange={updateFormData} values={formData} errors={errors} />
      </Wrapper>
    </Background>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  background: white;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--g-paleblue);
  position: relative;
  padding: 20px;
  `;

export default Profile;
