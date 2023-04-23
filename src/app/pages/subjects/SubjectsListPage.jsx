import React, { useState, useEffect } from "react";
import { get } from "../../services/subject-service";
import { map } from "rxjs/operators";
import SubjectCard from "../../components/cards/SubjectCard";
import { useParams, useNavigate, Outlet } from "react-router-dom";

const SubjectsListPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    const subscription = get("")
      .pipe(
        map((item) => {
          return item;
        })
      )
      .subscribe((item) => {
        setData((data) => [...data, item]);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getData = () => {
    setData([]);
    const subscription = get("")
      .pipe(
        map((item) => {
          return item;
        })
      )
      .subscribe((item) => {
        console.log(item);
        setData((data) => [...data, item]);
      });

    return () => {
      subscription.unsubscribe();
    };
  };

  const topicNavigate = (id) => {
    navigate(`/subjects/${id}`);
  };

  return (
    <div>
      {!id ? (
        <div>
          <div className="flex flex-col justify-between items-center py-10">
            <h1 className="font-bold text-2xl sm:text-5xl bg-clip-text sm:mb-4 text-[#0077C2]">
              Subjects
            </h1>
            <p className="hidden sm:block px-4 text-gray-400 text-lg text-center">
              <span className="text-teal-200"> Learn </span>,
              <span className="text-teal-200"> memorize </span>
              and
              <span className="text-teal-200"> practice </span>
              your understanding of complex subjects, through connections.
              Develop your information perception and logic links. Build
              <span className="text-teal-200"> lasting </span>
              experience, all in one place.
            </p>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-3">
              {data.map((item) => (
                <SubjectCard
                  item={item}
                  key={item.id}
                  handleClick={() => topicNavigate(item.id)}
                />
              ))}
            </div>
            {data.length === 6 && (
              <button
                className="text-teal-200 hover:text-indigo-200 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                onClick={getData}
              >
                Refresh...
              </button>
            )}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default SubjectsListPage;
