import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text,
  TrackballControls,
  OrbitControls,
  AsciiRenderer,
  PresentationControls,
} from "@react-three/drei";
import randomWord from "random-words";

import { Draggable } from "gsap/Draggable";
import MatrixCard from "matrix-card";
import { gsap } from "gsap";
import { DiJavascript } from "react-icons/di";

let MyWords = [
  "HTML",
  "Css",
  "Javascript",
  "GSAP",
  "Three Js",

  "Three Fiver",
  "Spline",
  "React JS",
  "ChartJs",
  "Tailwind",

  "Bootstrap",
  "Github",
  "Git",
  "Scss",
];

const getMyWord = () => {
  let num = Math.floor(Math.random() * MyWords.length);
  return MyWords[num];
};

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
          // randomWord(),
          getMyWord(),
        ]);
    console.log(temp);
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

const WordSphere = () => {
  const canvasRef = useRef();
  function disableZoom(event) {
    event.preventDefault();
    console.log("aaa");
  }

  useEffect(() => {
    // canvasRef.current.addEventListener("onWheel", disableZoom, {
    //   passive: false,
    // });

    return () => {
      //   anvasRef.current.removeEventListener("onWheel", disableZoom, {
      //     passive: false,
      //   });c
    };
  }, []);

  return (
    <div className=" h-100 h  w-100">
      <Canvas
        ref={canvasRef}
        // onWheel={disableZoom}
        className=" "
        // style={{ height: "100vh", width: "50vw" }}
        camera={{ position: [0, 0, 50] }}
        children
      >
        <OrbitControls maxZoom={0} enableZoom={false} autoRotate />
        {/* <TrackballControls cursorZoom={false} /> */}
        <ambientLight />
        <fog attach="fog" args={["#202025", 0, 80]} />

        {/* <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        > */}
        <Cloud count={8} radius={20} />
        {/* </PresentationControls> */}
        {/* <AsciiRenderer fgColor="white" bgColor="transparent" /> */}
      </Canvas>
    </div>
  );
};

export default WordSphere;
