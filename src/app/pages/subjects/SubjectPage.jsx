import React, { useState, useEffect } from "react";
import { get } from "../../services/subject-service";
import { map } from "rxjs/operators";

const SubjectPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscription = get("test")
      .pipe(
        map((item) => {
          console.log(item);
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
  }, []);

  return (
    <div>
      <div>Subject Page</div>
      {data.map((item, index) => (
        <h1 key={index}>{item}</h1>
      ))}
    </div>
  );
};

export default SubjectPage;
