import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeCanvas from "../tree/TreeCanvas";
import { getSubject } from "../../services/subject-service";
import CanvasSidebar from "../../components/sidebar/CanvasSidebar";
import { CanvasEvents } from "../../interface/interface";
import { SubjectDTO } from "../../generated/NetworkApi";

const SubjectPage = () => {
  const { id } = useParams();

  const [subjectLoading, setSubjectLoading] = useState(true);
  const [subject, setSubject] = useState<SubjectDTO>({} as SubjectDTO);
  const [tagList, setTagList] = useState<string[]>([]);
  const [activeSelection, setActiveSelection] = useState(false);

  const canvasRef = useRef<any>({});

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

  const handleCanvasEvent = (event: CanvasEvents, data: any) => {
    if (event === CanvasEvents.TAGS_UPDATE) {
      setTagList(data);
    }
  };

  const onTagClick = (tag: string) => {
    setActiveSelection(!activeSelection);
    canvasRef.current.handleHighlightTag(tag, activeSelection);
  };

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
        tagList={tagList}
        onTagClick={onTagClick}
        subject={subject}
        subjectLoading={subjectLoading}
      />

      {/* main focus */}
      <div className="flex-1">
        <TreeCanvas
          notifyEvent={handleCanvasEvent}
          subjectId={subject.id}
          canvasRef={canvasRef}
        />
      </div>
    </div>
  );
};

export default SubjectPage;
