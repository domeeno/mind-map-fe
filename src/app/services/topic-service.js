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

export function buildNodes(topics) {
  const nodes = [];
  const map = {};

  // First pass - map nodes by ID and build the top level of the hierarchy
  for (const topic of topics) {
    const id = topic.id;
    const parentId = topic.parentId;
    const node = { topic, children: [] };

    // Add node to map
    map[id] = node;

    // If no parentId, this is a top-level node
    if (!parentId) {
      nodes.push(node);
    }
  }

  // Second pass - add children to their parents
  for (const topic of topics) {
    const id = topic.id;
    const parentId = topic.parentId;
    const node = map[id];

    // If this node has a parent, add it as a child
    if (parentId) {
      const parent = map[parentId];
      parent.children.push(node);
    }
  }

  return nodes;
}
