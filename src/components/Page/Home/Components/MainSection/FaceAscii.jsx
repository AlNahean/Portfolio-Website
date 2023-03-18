import React, { useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AsciiRenderer,
  Center,
  Float,
  OrbitControls,
  PresentationControls,
  TorusKnot,
  useGLTF,
  torusKnotGeometry,
} from "@react-three/drei";
const FaceAscii = () => {
  useLayoutEffect(() => {
    // console.log(model);
    return () => {};
  }, []);
  return (
    <>
      <Canvas className=" h-100 w-100 ">
        {/* <ambientLight /> */}
        <color attach="background" args={["black"]} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Center>
            {/* <Float> */}

            {/* <mesh
              scale={2}
              // {...props}
              ref={ref}
            >
              <torusKnotGeometry args={[1, 0.2, 128, 32]} />
              <meshStandardMaterial color="red" />
            </mesh> */}
            <Model />
            {/* </Float> */}
          </Center>
        </PresentationControls>
        <AsciiRenderer
          fgColor="white"
          bgColor="transparent"
          // characters=".:-+*=%@. "
        />
      </Canvas>
    </>
  );
};
const Model = () => {
  const model = useGLTF("/models/face/scene.gltf");

  const ref = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 2;
  });
  return (
    <>
      <primitive
        ref={ref}
        object={model.scene}
        scale={20}
        // rotation={[0.4, -Math.PI / 3, 0]}
      />
      {/* <mesh
        scale={2}
        // {...props}
        // ref={ref}
      >
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial color="red" />
      </mesh> */}
    </>
  );
};

export default FaceAscii;
