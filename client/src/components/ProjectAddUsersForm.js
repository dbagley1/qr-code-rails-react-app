import { useEffect, useState } from "react";
import styled from "styled-components";
import { Error, Input, Label } from "../styles";

function ProjectAddUsersForm(props) {
  const [project, setProject] = useState(props.project);
  const updateProjectCallback = props.updateProjectCallback || (() => { });
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setProject(props.project);
  }, [props.project]);

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
              updateProjectCallback(data);
              setErrors([]);
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

  function removeUser(user) {
    if (window.confirm(`Are you sure you want to remove ${user.display_name || user.username} from the project?`)) {
      fetch(`/projects/${project.id}/users/${user.id}`, {
        method: 'DELETE'
      }).then(res => {
        if (res.ok) {
          res.json().then(data => {
            updateProjectCallback(data);
            setErrors([]);
          });
        } else {
          res.json().then(data => setErrors(data.errors));
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  function setOwner(user, bool) {
    if (window.confirm(`Are you sure you want to change ${user.display_name || user.username}'s permissions?`)) {
      fetch(`/projects/${project.id}/users/${user.id}/${bool ? 'owner' : 'not_owner'}`, {
        method: 'PATCH'
      }).then(res => {
        if (res.ok) {
          res.json().then(data => {
            updateProjectCallback(data);
          });
        } else {
          res.json().then(data => {
            console.log(data);
            setErrors(data.errors);
          });
        }
      })
        .catch(err => {
          console.log(err);
          setErrors(err.errors);
        });
    }
  }

  return (
    <div>
      <div style={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <Label
            htmlFor="username"
          >Username: </Label>
          <Input
            id="username"
            label="Username"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.map((error) => (
            <Error>{error}</Error>
          ))}
        </form>
        <UsersList>
          {project.users.map((user) => (
            <li key={user.id} style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                {project.owners.map(u => u.id).includes(user.id) ? (
                  <>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <OwnerAvatar src={user.image_url} alt="" />
                      <strong>{user.display_name || user.username}</strong> (Owner)
                    </span>
                    <span>
                      <InlineButton onClick={() => setOwner(user, false)}><span style={{ color: "red" }}>&times;</span> Owner</InlineButton>
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <OwnerAvatar src={user.image_url} alt="" />
                      <strong>{user.display_name || user.username}</strong>
                    </span>
                    <span>
                      <InlineButton style={{ color: "red" }} onClick={() => removeUser(user)}><i className="fa fa-trash-alt"></i></InlineButton>
                      <InlineButton onClick={() => setOwner(user, true)}><span style={{ color: "green" }}>+</span> Owner</InlineButton>
                    </span>
                  </>)}
              </div>
            </li>
          ))}
        </UsersList>
      </div>
    </div>
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
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 5px;
`;

const InlineButton = styled.button`
  background: none;
  margin: 0 0.25rem;
  padding: 2px 5px;
  `;


export default ProjectAddUsersForm;
