import React, { Component } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./Topic.css";

class Topic extends Component {
  state = {
    hovered: false,
    active: false,
  };

  meshRef = React.createRef();
  scale = 1;
  rotationSpeed = 5 / (10 * 1000);
  lastUpdated = 0;
  frameId = null;

  animate = (time) => {
    const delta = time - this.lastUpdated;

    if (!this.state.active) {
      this.meshRef.current.rotation.y += this.rotationSpeed * delta;
      this.meshRef.current.rotation.x -= this.rotationSpeed * delta;
    }

    this.lastUpdated = time;
    this.frameId = requestAnimationFrame(this.animate);
  };

  componentDidMount() {
    this.lastUpdated = performance.now();
    this.frameId = requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
  }

  handleActive = () => {
    console.log(this.state.active, this.scale);
    this.setState(
      (prevState) => ({
        active: !prevState.active,
      }),
      () => {
        if (this.props.onTopicActive) {
          this.props.onTopicActive(this.state.active); // Call the onTopicActive prop function and pass the active state
        }
      }
    );
  };

  handleHover = (value) => {
    this.setState({
      hovered: value,
    });
  };

  render() {
    const { position, topic } = this.props;
    const { hovered, active } = this.state;

    return (
      <mesh
        position={position}
        ref={this.meshRef}
        scale={active ? this.scale * 1.5 : this.scale}
        onClick={this.handleActive}
        onPointerOver={() => this.handleHover(true)}
        onPointerOut={() => this.handleHover(false)}
      >
        <dodecahedronGeometry />
        <meshStandardMaterial
          roughness={0.75}
          emissive={!hovered ? "#404057" : "#040475"}
        />

        <Html>
          <div
            onClick={this.handleActive}
            className={`${
              hovered ? "text-gray-200" : "text-gray-600"
            } text-sm hover:font-bold absolute text-gray-600 hover:text-gray-200 top-full left-1/2 transform -translate-x-1/2 translate-y-10`}
          >
            {topic.topicName}
          </div>
          {active && (
            <div>
              <button
                onClick={() => console.log("New")}
                className={`${
                  hovered ? "text-gray-200" : "text-gray-600"
                } text-sm hover:font-bold absolute text-gray-600 hover:text-gray-200 top-full transform -translate-x-5 -translate-y-20`}
              >
                New
              </button>
              <button
                onClick={() => console.log("Edit")}
                className={`${
                  hovered ? "text-gray-200" : "text-gray-600"
                } text-sm hover:font-bold absolute text-gray-600 hover:text-gray-200 top-full transform -translate-x-20 -translate-y-10`}
              >
                Edit
              </button>
            </div>
          )}
        </Html>
      </mesh>
    );
  }
}

export default Topic;
