import React, { Suspense, useRef, useEffect } from "react";
import { useAnimations, OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



const Models = () => {
  const result = useLoader(GLTFLoader, "/flying/scene.gltf");
  const drone = useRef();
  
  const { actions } = useAnimations(result.animations, drone);

  useEffect(() => {
    const obj = Object.values(actions)[0];
    obj.play();
  });

  return <primitive ref={drone} object={result.scene} />;
};

const Drone = () => {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, -2, 9], fov: 50 }}>
        <OrbitControls />
        <directionalLight intensity={0.5} />
        <pointLight position={[0, -1, 5]}/>
        <pointLight position={[0, -1, -10]}/>
        <Models />
        <Environment files={'/old_hall_1k.hdr'} background />
      </Canvas>
    </Suspense>
  );
};

export default Drone;

/* <Environment files={"/old_hall_1k.hdr"} background /> */