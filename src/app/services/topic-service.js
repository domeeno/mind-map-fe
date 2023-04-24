import { Observable } from "rxjs";

const BASE_URL = "http://localhost:8082/api/topic"; // replace with your backend URL

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

// function that the component will subscribe to to get the data
export function getTopicTree(rootTopicId) {
  return new Observable((observer) => {
    const source = new EventSource(`${BASE_URL}/tree/${rootTopicId}`, {
      headers: getAuthHeader(),
    });
    source.onmessage = (event) => {
      observer.next(JSON.parse(event.data));
    };
    source.onerror = (event) => {
      if (event.eventPhase === EventSource.CLOSED) {
        observer.complete();
      } else {
        observer.error("Request failed");
      }
    };
    return () => {
      source.close();
    };
  });
}
