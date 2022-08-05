import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import ProjectForm from "../components/ProjectForm";
import QRCodeListCards from "../components/QRCodeListCards";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

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
      .then(setProjects);
  }, []);

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
      .then(response => response.json())
      .then(data => {
        setProjects(projects.map(project => project.id === editId ? data : project));
        setEditId(null);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function closeEditForm() {
    setEditId(null);
    setFormData({});
  }

  return (
    <Wrapper>
      <div>
        <Button as={Link} to="/new-project">
          Create New Project
        </Button>
      </div>
      {projects?.length ? (
        projects.map((project) => (
          <ProjectItem key={project.id}>
            {editId !== project.id ? (<Box>
              <ProjectDetails>
                <div>
                  <h2>{project.title}</h2>
                  <p>Created by: {project?.owner?.username}</p>
                </div>
                <div>
                  {
                    project?.qr_codes?.length ?
                      <QRCodeListCards qrCodes={project.qr_codes} /> :
                      "No QR Codes"
                  }
                </div>
                <ProjectItemButtonGroup>
                  <ProjectItemButton onClick={() => deleteProject(project)}>Delete</ProjectItemButton>
                  <ProjectItemButton onClick={() => editProject(project)}>Edit</ProjectItemButton>
                </ProjectItemButtonGroup>
              </ProjectDetails>
            </Box>) :
              (<Box>
                <ProjectDetails>
                  <ProjectForm onChange={updateFormData} onSubmit={handleEditSubmit} showPreview={false} values={formData} />
                  <div>
                    <ProjectItemButtonGroup>
                      <ProjectItemButton onClick={() => closeEditForm()}>Cancel</ProjectItemButton>
                      <ProjectItemButton onClick={() => deleteProject(project)}>Delete</ProjectItemButton>
                    </ProjectItemButtonGroup>
                  </div>
                </ProjectDetails>
              </Box>)
            }
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
& > div {
    display: flex;
    flex-flow: row wrap;
    padding: 15px;
    gap: 20px;
    justify-content: start;
    background: white;

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
  overflow-wrap: anywhere;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;

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


export default ProjectList;
