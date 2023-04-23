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
      <button onClick={goBack}>Back</button>
      <h1>Tree {id}</h1>

      {/* div element that takes the whole remaining space of its parent size using tailwind classes*/}
      <div className="flex-1 w-full">
        <TreeCanvas />
      </div>
    </div>
  );
};

export default SubjectTree;
