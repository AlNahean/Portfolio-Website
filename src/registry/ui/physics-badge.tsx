"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, ReactThreeFiber } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
    Physics,
    useRopeJoint,
    useSphericalJoint,
    RigidBody,
    BallCollider,
    CuboidCollider,
    RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Extend Three.js with MeshLine
extend({ MeshLineGeometry, MeshLineMaterial });

// Type definitions for MeshLine to satisfy TypeScript
declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: ReactThreeFiber.Object3DNode<
                MeshLineGeometry,
                typeof MeshLineGeometry
            >;
            meshLineMaterial: ReactThreeFiber.Object3DNode<
                MeshLineMaterial,
                typeof MeshLineMaterial
            >;
        }
    }
}

interface PhysicsBadgeProps {
    className?: string;
    modelUrl?: string;
    textureUrl?: string;
    anchorX?: number;
}

export default function PhysicsBadge({
    className,
    modelUrl = "/assets/3d/card.glb",
    textureUrl = "/assets/images/tag_texture.png",
    anchorX = 0,
}: PhysicsBadgeProps) {
    const [isWebGLSupported, setIsWebGLSupported] = useState(true);

    useEffect(() => {
        try {
            const canvas = document.createElement("canvas");
            const supported = !!(
                window.WebGLRenderingContext &&
                (canvas.getContext("webgl") ||
                    canvas.getContext("experimental-webgl") ||
                    canvas.getContext("webgl2"))
            );
            setIsWebGLSupported(supported);
        } catch (e) {
            setIsWebGLSupported(false);
        }
    }, []);

    // Preload assets for smoother experience
    useGLTF.preload(modelUrl);
    useTexture.preload(textureUrl);

    if (!isWebGLSupported) {
        return (
            <div className={cn("relative h-full w-full flex items-center justify-center bg-muted/10 rounded-xl", className)}>
                <span className="text-xs text-muted-foreground p-4 text-center">Interactive 3D badge unavailable</span>
            </div>
        );
    }

    return (
        <div className={cn("relative h-full w-full", className)}>
            <Canvas
                camera={{ position: [0, 0, 13], fov: 25 }}
                // Ensure the canvas itself is transparent
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={Math.PI} />
                <Physics
                    debug={false}
                    interpolate
                    gravity={[0, -40, 0]}
                    timeStep={1 / 60}
                >
                    <Band modelUrl={modelUrl} textureUrl={textureUrl} anchorX={anchorX} />
                </Physics>

                <Environment background={false} blur={0.75}>
                    <Lightformer
                        intensity={2}
                        color="white"
                        position={[0, -1, 5]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[-1, -1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={3}
                        color="white"
                        position={[1, 1, 1]}
                        rotation={[0, 0, Math.PI / 3]}
                        scale={[100, 0.1, 1]}
                    />
                    <Lightformer
                        intensity={10}
                        color="white"
                        position={[-10, 0, 14]}
                        rotation={[0, Math.PI / 2, Math.PI / 3]}
                        scale={[100, 10, 1]}
                    />
                </Environment>
            </Canvas>
        </div>
    );
}

interface BandProps {
    maxSpeed?: number;
    minSpeed?: number;
    modelUrl: string;
    textureUrl: string;
    anchorX?: number;
}

function Band({ maxSpeed = 50, minSpeed = 10, modelUrl, textureUrl, anchorX = 0 }: BandProps) {
    const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
    const fixed = useRef<RapierRigidBody>(null);
    const j1 = useRef<RapierRigidBody>(null);
    const j2 = useRef<RapierRigidBody>(null);
    const j3 = useRef<RapierRigidBody>(null);
    const card = useRef<RapierRigidBody>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { nodes, materials } = useGLTF(modelUrl) as any;
    const texture = useTexture(textureUrl);

    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ])
    );

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? "grabbing" : "grab";
            return () => void (document.body.style.cursor = "auto");
        }
        return () => void (document.body.style.cursor = "auto");
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (
            !fixed.current ||
            !j1.current ||
            !j2.current ||
            !j3.current ||
            !band.current ||
            !card.current
        )
            return;

        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            });
        }

        if (fixed.current) {
            const [j1Lerped, j2Lerped] = [j1, j2].map((ref) => {
                if (ref.current) {
                    const lerped = new THREE.Vector3().copy(ref.current.translation());
                    const clampedDistance = Math.max(
                        0.1,
                        Math.min(1, lerped.distanceTo(ref.current.translation()))
                    );
                    return lerped.lerp(
                        ref.current.translation(),
                        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                    );
                }
            });

            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2Lerped ?? j2.current.translation());
            curve.points[2].copy(j1Lerped ?? j1.current.translation());
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));

            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel(
                { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
                false
            );
        }
    });

    curve.curveType = "chordal";
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    const segmentProps = {
        type: "dynamic",
        canSleep: true,
        colliders: false,
        angularDamping: 2,
        linearDamping: 2,
    } as const;

    return (
        <>
            <group position={[anchorX, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[2, 0, 0]}
                    ref={card}
                    {...segmentProps}
                    type={dragged ? "kinematicPosition" : "dynamic"}
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={2.25}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e) => {
                            (e.target as Element).releasePointerCapture(e.pointerId);
                            drag(false);
                        }}
                        onPointerDown={(e) => {
                            (e.target as Element).setPointerCapture(e.pointerId);
                            drag(
                                new THREE.Vector3()
                                    .copy(e.point)
                                    .sub(vec.copy(card.current!.translation()))
                            );
                        }}
                    >
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                map={materials.base.map}
                                map-anisotropy={16}
                                clearcoat={1}
                                clearcoatRoughness={0.15}
                                roughness={0.3}
                                metalness={0.5}
                            />
                        </mesh>
                        <mesh
                            geometry={nodes.clip.geometry}
                            material={materials.metal}
                            material-roughness={0.3}
                        />
                        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={new THREE.Vector2(3200, 2000)}
                    useMap={1}
                    map={texture}
                    repeat={new THREE.Vector2(-3, 1)}
                    lineWidth={1}
                />
            </mesh>
        </>
    );
}
