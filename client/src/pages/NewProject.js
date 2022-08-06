import { useRef, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ProjectForm from "../components/ProjectForm";

function NewProject({ user }) {
  let now = new Date();
  let dateString = now.toLocaleString('en-US', { month: "numeric", day: "numeric" }).replace(/[\s/]/g, '-');
  let timeString = now.toLocaleString('en-US', { hour: "numeric", minute: "numeric" });

  const [formData, setFormData] = useState({
    title: `New Project ${dateString} ${timeString}`,
    url: "https://www.example.com",
  });

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function updateFormData(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleFormSubmit(e) {
    let { title } = formData;

    e.preventDefault();
    setIsLoading(true);
    fetch("/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        user_id: user.id
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/projects");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    }).catch((err) => {
      setErrors(err.errors);
    });
  }

  return (
    <Wrapper>
      <FormWrapperChild>
        <h1>Create a Project</h1>
        <ProjectForm onChange={updateFormData} onSubmit={handleFormSubmit} values={formData} isLoading={isLoading} errors={errors} />
      </FormWrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  gap: 24px;
  flex-flow: row wrap;

  @media (max-width: 768px) {
    max-width: 450px;
    flex-flow: column nowrap;
    gap: 0;
  }
`;

const WrapperChild = styled.div`
  flex: 0 0 auto;
  
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;

const FormWrapperChild = styled.div`
  flex: 1 0 auto;
  
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;

const QRPreviewWrapper = styled.div`
  max-width: 250px;
  width: 100%;
`;

export default NewProject;
