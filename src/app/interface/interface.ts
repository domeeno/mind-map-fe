
export interface TopicDTO {
  id: string;
  type: "ROOT" | "TOPIC" | "DOCUMENT";
  color: string;
  weight: "XS" | "LIGHT" | "MEDIUM" | "HEAVY" | "XL" | "ROOT";
  tags: string[];
  parentId: string;
  userId: string | null;
  topicName: string;
}

export interface Node {
    topic: TopicDTO;
    children: Node[];
}
