import React from "react";
import { Line } from "@react-three/drei";

const Connection = ({ from, to, weight, color }) => {
  return <Line points={[from, to]} color={color} lineWidth={weight} />;
};

export default Connection;
