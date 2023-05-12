import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeCanvas from "../tree/TreeCanvas";
import { getSubject } from "../../services/subject-service";
import CanvasSidebar from "../../components/sidebar/CanvasSidebar";

const SubjectPage = () => {
  const { id } = useParams();

  const [subjectLoading, setSubjectLoading] = useState(true);
  const [subject, setSubject] = useState({});

  const [collapsed, setCollapsed] = useState(false);

  function toggleCollapse() {
    setCollapsed(!collapsed);
  }

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
    <div className="flex h-screen">
      {/* side panel */}
      <CanvasSidebar
        toggleCollapse={toggleCollapse}
        collapsed={collapsed}
        goBack={goBack}
        subject={subject}
        subjectLoading={subjectLoading}
      />

      {/* main focus */}
      <div className="flex-1">
        <TreeCanvas subjectId={subject.id} />
      </div>
    </div>
  );
};
export default SubjectPage;
