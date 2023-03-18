import React, { useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Float,
  OrbitControls,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
const BedroomModel = () => {
  const model = useGLTF("/models/isoBedroom/scene.gltf");
  useLayoutEffect(() => {
    console.log(model);
    return () => {};
  }, []);
  return (
    <>
      <Canvas className=" h-100 w-100 ">
        <ambientLight />
        <PresentationControls
          // position={[0, 0, 2]}
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          {/* <Center> */}
          <Float>
            <primitive
              object={model.scene}
              scale={0.02}
              rotation={[0.4, -Math.PI / 3, 0]}
            />
          </Float>
          {/* </Center> */}
        </PresentationControls>
      </Canvas>
    </>
  );
};

export default BedroomModel;
