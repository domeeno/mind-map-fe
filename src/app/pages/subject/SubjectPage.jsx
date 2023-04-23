import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeCanvas from "../../components/canvas/TreeCanvas";
import { getSubject } from "../../services/subject-service";

const SubjectPage = () => {
  const { id } = useParams();

  const [subjectLoading, setSubjectLoading] = useState(true);
  const [subject, setSubject] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setSubjectLoading(true);
    const subscription = getSubject(id).subscribe((item) => {
      setSubject(item);
      setSubjectLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  const goBack = () => {
    navigate(`/subjects`);
  };

  return (
    <div>
      {/* button to go back */}
      <div
        className={` ${
          subjectLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      >
        <h1 className="py-5">
          Subject Tree:{" "}
          <span className="text-[#0077C2]">{subject.subjectName}</span>
        </h1>
        <p className="text-gray-400">{subject.description}</p>
      </div>

      <button className="py-3" onClick={goBack}>
        {"< "}Back
      </button>
      {subject.rootTopic && (
        <div>
          <TreeCanvas rootTopicId={subject.rootTopic} />
        </div>
      )}
    </div>
  );
};
export default SubjectPage;
