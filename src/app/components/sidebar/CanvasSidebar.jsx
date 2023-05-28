import React from "react";

const CanvasSidebar = ({
  toggleCollapse,
  collapsed,
  goBack,
  tagList,
  onTagClick,
  subject,
  subjectLoading,
}) => {
  return (
    <>
      {!collapsed ? (
        <div className="flex-shrink-0 max-w-xs w-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden p-6 transition-all duration-300 flex flex-col">
          <button className="p-4 flex-initial" onClick={toggleCollapse}>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 8l-4 4 4 4v-3h8v-2h-8V8z" />
            </svg>
          </button>

          <div className="flex-shrink-0 flex-initial">
            <button className="py-3" onClick={goBack}>
              {"< "}Back
            </button>
            <div
              className={`${
                subjectLoading ? "opacity-0" : "opacity-100"
              } transition-opacity duration-500`}
            >
              <h1 className="py-5">
                Subject Tree:{" "}
                <span className="text-[#0077C2]">{subject.subjectName}</span>
              </h1>
              <p className="text-gray-400">{subject.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap mt-2 flex-auto min-h-0 overflow-y-auto content-start">
            {tagList.map((tag, index) => (
              <button
                type="button"
                onClick={() => onTagClick(tag)}
                className="text-sm inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-200 text-gray-800 rounded-full mr-2 mb-2"
                key={index}
              >
                {`#${tag}`}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button className="p-4" onClick={toggleCollapse}>
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 8l4 4-4 4v-3H4V11h8V8z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default CanvasSidebar;
