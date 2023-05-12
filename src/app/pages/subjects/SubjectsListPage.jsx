import React, { useState, useEffect } from "react";
import { getSubjects } from "../../services/subject-service";
import { map } from "rxjs/operators";
import SubjectCard from "../../components/cards/SubjectCard";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { styles } from "../../../styles";

const SubjectsListPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData([]);
    const subscription = getSubjects()
      .pipe(
        map((item) => {
          return item;
        })
      )
      .subscribe({
        next: (item) => {
          setData((data) => [...data, item]);
        },
        error: (error) => {
          setError(error);
          setLoading(false);
        },
        complete: () => {
          setLoading(false);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getData = () => {
    setLoading(true);
    setError(null);
    setData([]);
    const subscription = getSubjects()
      .pipe(
        map((item) => {
          return item;
        })
      )
      .subscribe({
        next: (item) => {
          setData((data) => [...data, item]);
        },
        error: (error) => {
          setError(error);
          setLoading(false);
        },
        complete: () => {
          setLoading(false);
        },
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
        <div className={`${styles.paddingX}`}>
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

            {error && (
              <div className="border-2 border-red-800 border-opacity-60 rounded-lg overflow-hidden mb-6">
                <div className="p-6 group border-red-800 border-opacity-60 rounded-lg overflow-hidden shadow-lg hover:bg-gray-800 transition-all duration-300">
                  Something went wrong, please refresh or try again later.
                </div>
              </div>
            )}

            {!loading && (
              <button
                className="text-teal-200 hover:text-indigo-200 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                onClick={() => {
                  getData();
                }}
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
