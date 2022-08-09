import { useState } from "react";
import { Error, Input, Label } from "../styles";

function ProjectAddUsersForm(props) {
  const { project } = props;
  const addUsersCallback = props.addUsersCallback || (() => { });
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/projects/${project.id}/users/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(data => {
              console.log(data);
              addUsersCallback(data);
            });
        } else {
          res.json().then(data => setErrors(data.errors));
        }
      })
      .catch(err => {
        console.log(err);
        setErrors(err.errors);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label
          htmlFor="username"
        >Username: </Label>
        <Input
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {JSON.stringify(errors)}
        {errors.map((error) => (
          <Error>{error}</Error>
        ))}
      </form>
    </div>
  );
}

export default ProjectAddUsersForm;
