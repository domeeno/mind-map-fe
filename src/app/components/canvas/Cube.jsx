import React from 'react';
import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

class Cube extends React.Component {
    constructor(props) {
      super(props);
      this.meshRef = React.createRef();
    }
  
    animate = () => {
        if (this.meshRef.current) {
            this.meshRef.current.rotation.x += 0.01;
            this.meshRef.current.rotation.y += 0.01;
        }

        this.frameId = requestAnimationFrame(this.animate);
    };

    componentDidMount() {
        this.frameId = requestAnimationFrame(this.animate);
    }

    componentWillUnmount() {   
        cancelAnimationFrame(this.frameId);
    }
  
    render() {
      return (
        <Box args={[1, 1, 1]} position={[0, 0, 0]} ref={this.meshRef}>
          <meshStandardMaterial color="red" />
        </Box>
      );
    }
  }
  
  export default Cube;