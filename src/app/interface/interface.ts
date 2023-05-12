import { TopicDTO } from "../generated/NetworkApi";

export interface Node {
  topic: TopicDTO;
  connections: Node[];
}
