import { Observable } from "rxjs";

const BASE_URL = "http://localhost:8082/api/file"; // replace with your backend URL

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function postFile(topicId, data) {
  return fetch(`${BASE_URL}/${topicId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: `content: ${JSON.stringify(data)}`,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Request failed");
  });
}
