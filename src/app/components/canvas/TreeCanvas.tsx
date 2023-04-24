import React, { Suspense, useEffect, useState} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "./Loader";
import { getTopicTree, buildNodes } from "../../services/topic-service";
import { map, toArray } from "rxjs/operators";
import { Subscription } from "rxjs";
import { TopicDTO, Node } from "../../interface/interface"
import Tree from "./Tree";

interface TreeCanvasProps {
  rootTopicId: string;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({ rootTopicId }) => {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    console.log("nodes", nodes);
  }, [nodes]);

  useEffect(() => {
    setNodes([]);
    const subscription: Subscription = getTopicTree(rootTopicId)
      .pipe(
        map((item: TopicDTO) => {
          console.log(item);
          return item;
        }),
        toArray(),
        map((topics: TopicDTO[]) => buildNodes(topics))
      )
      .subscribe((nodes: Node[]) => {
        setNodes(nodes);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [rootTopicId]);

  return (
    <Canvas style={{ height: 1000 }}>
      <pointLight color="indianred" />
      <pointLight position={[10, 10, -10]} color="orange" />
      <pointLight position={[-10, -10, 10]} color="lightblue" />

      { nodes.length !== 0 && <Tree node={nodes[0]} />}

      <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
      <OrbitControls enableRotate={false} enableZoom={false} />
      <Suspense fallback={<CanvasLoader />} />
    </Canvas>
  );
};

export default TreeCanvas;