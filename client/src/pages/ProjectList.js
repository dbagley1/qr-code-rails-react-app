import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import ProjectForm from "../components/ProjectForm";
import QRCodeListCards from "../components/QRCodeListCards";
import ProjectAddUsersForm from "../components/ProjectAddUsersForm";

function ProjectList({ user }) {
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const [reload, setReload] = useState(false);
  const [expandProjects, setExpandProjects] = useState([]);
  const [addUsersId, setAddUsersId] = useState(null);
  const [errors, setErrors] = useState([]);

  function deleteProject(project) {
    const { id, title } = project;

    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      fetch(`/projects/${id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          setProjects(projects.filter(project => project.id !== id));
        }
      });
    }
  }

  useEffect(() => {
    fetch("/projects")
      .then((r) => r.json())
      .then(setProjects)
      .then(() => {
        setReload(false);
      });
  }, [reload, setReload]);

  function editProject(project) {
    setEditId(project.id);
    setFormData({ ...project });
  }

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    fetch(`/projects/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            setProjects(projects.map(project => project.id === editId ? data : project));
            setEditId(null);
            setErrors([]);
          });
        } else {
          response.json().then(data => {
            setErrors(data.errors);
          });
        }
      }).catch(error => {
        console.log(error);
      });
  }

  function closeEditForm() {
    setEditId(null);
    setFormData({});
    setErrors([]);
  }

  function qrCodeEditCallback(data) {
    if (!data.errors) {
      setEditId(null);
      setFormData({});
      setReload(true);
    }
  }

  function leaveProject({ id, title }) {
    if (window.confirm(`Are you sure you want to leave ${title}?`)) {
      fetch(`/projects/${id}/leave`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          setProjects(projects.filter(project => project.id !== id));
        }
      });
    }
  }

  function toggleExpandProject(id) {
    setExpandProjects(expandProjects.includes(id) ? expandProjects.filter(project => project !== id) : [...expandProjects, id]);
  }

  function toggleShowAddUsers(project) {
    if (addUsersId === project.id) {
      setAddUsersId(null);
    } else {
      setAddUsersId(project.id);
    }
  }

  function updateProjectCallback(project) {
    setProjects(projects.map(p => p.id === project.id ? project : p));
  }

  return (
    <Background>
      <Wrapper>
        <div>
          <Button as={Link} to="/new-project">
            Create New Project
          </Button>
        </div>
        {projects?.length ? (
          projects.map((project) => (
            <ProjectItem key={project.id}>
              <div>
                {
                  project.owners.map(user => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <OwnerAvatar src={user.image_url} alt="" />
                      <span style={{ fontSize: "1rem", color: "var(--g-blue)" }}>{user.display_name || user.username}</span>
                    </div>
                  ))
                }
              </div>
              {editId !== project.id ? (<Box>
                <ProjectDetails>
                  <div>
                    <div style={{ cursor: "pointer" }} onClick={() => toggleExpandProject(project.id)}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2>{project.qr_codes.length ? (
                          expandProjects.includes(project.id) ?
                            <i className="fas fa-minus-circle" style={{ color: "lightgray" }} onClick={() => toggleExpandProject(project.id)}></i> :
                            <i className="fas fa-plus-circle" style={{ color: "var(--g-blue)" }} onClick={() => toggleExpandProject(project.id)}></i>
                        ) :
                          ''
                        } {project.title}</h2>
                      </div>
                    </div>
                  </div>
                  {
                    project.qr_codes.length ? (
                      expandProjects.includes(project.id) &&
                      <div style={{ padding: "0 20px" }}>
                        <QRCodeListCards qrCodes={project.qr_codes} user={user} editCallback={qrCodeEditCallback} />
                      </div>
                    ) :
                      <p>This project doesn't have any QR Codes.</p>
                  }
                  {project.owners.map(u => u.id).includes(user.id) ?
                    (<ProjectItemButtonGroup>
                      <ProjectItemButton onClick={() => deleteProject(project)}>Delete</ProjectItemButton>
                      <ProjectItemButton onClick={() => editProject(project)}>Edit</ProjectItemButton>
                      <ProjectItemButton onClick={() => toggleShowAddUsers(project)}>Share</ProjectItemButton>
                    </ProjectItemButtonGroup>
                    ) :
                    (<ProjectItemButtonGroup>
                      <ProjectItemButton onClick={() => leaveProject(project)}>Leave Project</ProjectItemButton>
                    </ProjectItemButtonGroup>
                    )}
                </ProjectDetails>
              </Box>) :
                (<Box>
                  <ProjectDetails>
                    <ProjectForm onChange={updateFormData} onSubmit={handleEditSubmit} showPreview={false} values={formData} errors={errors} />
                    <div>
                      <ProjectItemButtonGroup>
                        <ProjectItemButton onClick={() => closeEditForm()}>Cancel</ProjectItemButton>
                        <ProjectItemButton onClick={() => deleteProject(project)}>Delete</ProjectItemButton>
                      </ProjectItemButtonGroup>
                    </div>
                  </ProjectDetails>
                </Box>)
              }
              {addUsersId === project.id && (
                <ProjectAddUsersForm project={project} updateProjectCallback={updateProjectCallback} />
              )}
            </ProjectItem>
          ))
        ) : (
          <>
            <h2>No Projects Found</h2>
            <Button as={Link} to="/new-project">
              Make a New Project
            </Button>
          </>
        )}
      </Wrapper>
    </Background >
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
  padding: 15px;
`;

const ProjectItem = styled.div`
  padding: 15px;
  gap: 10px;
  border-radius: 6px;
  background: white;

  & > div {
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
    justify-content: start;

    @media only screen and (max-width: 500px) {
      justify-content: center;
    }
  }
`;

const ProjectItemButton = styled.button`
  span {
    display: none;
  }

  &:hover {
    span {
      display: inline;
    }
  }
  `;

const ProjectDetails = styled.div`
  flex: 1 1 50%;
  gap: 16px;
  overflow-wrap: anywhere;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin-top: 10px;

  @media only screen and (max-width: 500px) {
    text-align: center;
    flex-basis: 100%;
  }
  `;

const ProjectItemButtonGroup = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 10px;
`;

const OwnerAvatar = styled.img`
  display: inline;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 5px;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--g-paleblue);
  position: relative;
  `;

export default ProjectList;
