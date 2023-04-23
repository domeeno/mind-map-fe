import React from "react";

const SubjectCard = ({ item }) => {
  return (
    <div className="w-full p-2 hover:cursor-pointer">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
        <div className="h-full p-6 group border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-lg hover:bg-gray-800 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2">{item.subjectName}</h2>
          <p className="text-[#0077C2] leading-relaxed mb-3">
            {item.description}
          </p>
          <div className="flex flex-wrap mt-2">
            {item.tags.map((tag, index) => (
              <span
                className="text-sm inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-200 text-gray-800 rounded-full mr-2 mb-2"
                key={index}
              >
                {`#${tag}`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
