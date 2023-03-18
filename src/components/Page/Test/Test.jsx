import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text,
  TrackballControls,
  OrbitControls,
  AsciiRenderer,
} from "@react-three/drei";
import randomWord from "random-words";

import { Draggable } from "gsap/Draggable";
import MatrixCard from "matrix-card";
import { gsap } from "gsap";

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = {
    font: "/Inter-Bold.woff",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    // Make text face the camera
    ref.current.quaternion.copy(camera.quaternion);
    // Animate font color
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "white"),
      0.1
    );
  });
  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      onClick={() => console.log("clicked")}
      {...props}
      {...fontProps}
      children={children}
    />
  );
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          randomWord(),
        ]);
    return temp;
  }, [count, radius]);
  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}
//

function Torusknot(props) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame(
    (state, delta) =>
      (ref.current.rotation.x = ref.current.rotation.y += delta / 2)
  );
  return (
    <mesh
      scale={Math.min(viewport.width, viewport.height) / 5}
      {...props}
      ref={ref}
    >
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

const Test = () => {
  const draggableRef = useRef(null);
  const el = useRef(null);
  //   useEffect(() => {
  //     Draggable.create(".draggable", {
  //       type: "rotation",
  //       onPress: function () {
  //         console.log("clicked");
  //       },
  //     });
  //     return () => {};
  //   }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".draggable", { x: 100 });
      //   Draggable.create(".draggable", {
      //     type: "rotation",
      //     onPress: function () {
      //       console.log("clicked");
      //     },
      //   });
      //   gsap.to(camera.current.position, {
      //     x: Math.random() * 100,
      //     y: Math.random() * 100,
      //     z: Math.random() * 100,
      //     duration: 3,
      //   })
      //   setInterval(() => {
      //     gsap.to(camera.current.position, {
      //       x: (Math.random() - 0.5) * 100,
      //       duration: 3,
      //     });
      //   }, 1000);
    }, el);

    // setPosState(0)
    return () => {
      ctx.revert();
    };
  }, []);

  //   useEffect(() => {
  //     const draggable = new Draggable(draggableRef.current, {
  //       // Add your Draggable options here
  //     });

  //     return () => {
  //       draggable.forEach((draggableInstance) => draggableInstance.kill());
  //     };
  //   }, []);

  return (
    <div ref={el}>
      <div className=" " style={{ height: "100vh", width: "98vw" }}>
        <div
          style={{
            overflow: "hidden",
            position: "absolute",
            width: "100vw",
            height: "100vh",
          }}
        >
          <MatrixCard
            id={"my-id-2"}
            matrixText={"ANIMATE ME 2"}
            delay={100}
            backgroundColor={"rgba(0, 40, 0, 0.1)"}
            textFontSize={"16"}
            textMainColor={"#00FF00"}
            textAlternateColorRatio={0.1}
            textAlternateColorList={[
              "#00F000",
              "#00EA00",
              "#00E000",
              "#00D600",
            ]}
            styleOverrideForCanvas={{ backgroundColor: "#00FF00" }}
            styleOverrideForContainerDiv={{ backgroundColor: "rgba(0, 40, 0)" }}
            styleOverrideForChildrenDiv={{ display: "none" }}
          ></MatrixCard>
        </div>
        <div className="  draggable" ref={draggableRef}>
          <div className=" btn btn-primary"> a</div>
          <div className=" btn btn-primary"> a</div>
        </div>
      </div>
      <div className=" d-flex">
        <Canvas
          className=""
          style={{ height: "100vh", width: "50vw" }}
          camera={{ position: [0, 0, 45] }}
        >
          {/* <OrbitControls /> */}
          <TrackballControls />
          <ambientLight />
          {/* <pointLight position={[10, 10, 10]} /> */}
          <fog attach="fog" args={["#202025", 0, 80]} />
          <Cloud count={8} radius={20} />
          {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        </Canvas>
        <Canvas
          className=""
          style={{ height: "100vh", width: "50vw" }}
          camera={{ position: [0, 0, 45] }}
        >
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Torusknot />
          <OrbitControls />
          <AsciiRenderer fgColor="white" bgColor="transparent" />
        </Canvas>
      </div>
    </div>
  );
};

export default Test;
