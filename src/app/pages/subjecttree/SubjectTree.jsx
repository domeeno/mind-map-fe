import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeCanvas from "../../components/canvas/SubjectTreeCanvas";

const SubjectTree = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/subjects`);
  };

  return (
    <div>
      {/* button to go back */}
      <button onClick={goBack}>{"< "}Back</button>
      <h1>Tree {id}</h1>

      {/* expand this div untill footer with tailwind classes*/}
      <div>
        <TreeCanvas />
      </div>
    </div>
  );
};

export default SubjectTree;
