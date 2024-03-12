import { useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import useBreakpoint from "../../hooks/useBreakpoint.ts";
import { Lerp } from "../../utils/LerpUtils.ts";
import { texturePath } from "../../utils/ResourcesUtils.ts";
import {
    latLongToCartesian,
    MeshTransform,
} from "../../utils/TransformUtils.ts";
import { EarthMaterial } from "./EarthMaterial.tsx";
import { useControls } from "leva";

const earthRadius = 1;
const pinLatitude = 24.1;
const pinLongitude = -103.7;
const earthGradientFrom = new THREE.Color("#e37cff");
const earthGradientTo = new THREE.Color("#00c8ff");

export default function EarthModel() {
    const textureMask = useTexture(texturePath("texture_earth_mask_small.jpg"));
    const textureMask2 = useTexture(
        texturePath("texture_single_dot_pattern.png"),
    );
    textureMask.anisotropy = 8;
    textureMask2.anisotropy = 64;

    const groupRef = useRef<Group>(null!);
    const matRef = useRef<typeof EarthMaterial>(null!);
    const pinRef = useRef<Group>(null!);

    const { width, isSm, isMd, isLg } = useBreakpoint();

    const isLgOrBelow = isSm || isMd || isLg;

    const dotDensity = isLgOrBelow ? Lerp(0.075, 0.15, width / 1024) : 0.15;
    const dotFillSize = isLgOrBelow ? Lerp(0.925, 0.95, width / 1024) : 0.95;

    const { dpfs, dpps, dppv, fresInt, dpd, fresMax, fresMin, intensity } =
        useControls({
            dpd: {
                min: 0,
                value: 0.15,
            },
            dpfs: {
                min: 0,
                value: 0.95,
                max: 1,
            },
            dppv: {
                min: 0,
                value: 1,
            },
            dpps: {
                min: 0,
                value: 1,
            },
            fresInt: {
                min: 0,
                value: 0.3,
                max: 10,
            },
            fresMin: {
                min: -1,
                value: -0.18,
                max: 1,
            },
            fresMax: {
                min: 0,
                value: 2,
                max: 2,
            },
            intensity: {
                min: 0,
                value: 0.7,
            },
        });

    useEffect(() => {
        const { position }: MeshTransform = latLongToCartesian(
            pinLatitude,
            pinLongitude,
            earthRadius,
        );
        const posVec3 = new Vector3(position![0], position![1], position![2]);
        pinRef.current.lookAt(posVec3);
    }, []);

    useFrame((_state, delta) => {
        groupRef.current.rotation.y += 0.15 * delta;
    });

    const glassMat = (
        <MeshTransmissionMaterial
            thickness={0.4}
            ior={0.975}
            iridescence={0.1}
            distortionScale={0.5}
            temporalDistortion={0.1}
            resolution={1024}
            samples={2}
            roughness={0.05}
            metalness={0.15}
            specularIntensity={0.2}
        />
    );

    return (
        <group ref={groupRef} rotation={[0.4, 1.1, 0]}>
            <group ref={pinRef}>
                <directionalLight
                    color={"#aa7ad6"}
                    position={[2, 5, 1]}
                    intensity={100}
                />
                <group
                    position={[0, 0, earthRadius]}
                    rotation={[Math.PI / 2, 0, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.015, -0.015, 0.2, 8]} />
                        {glassMat}
                    </mesh>
                    <mesh position-y={0.1 + 0.05}>
                        <sphereGeometry args={[0.05, 32]} />
                        {glassMat}
                    </mesh>
                </group>
            </group>

            <mesh>
                <icosahedronGeometry args={[earthRadius, 32]} />
                <earthMaterial
                    ref={matRef}
                    earthTextureMask={textureMask}
                    dotTextureMask={textureMask2}
                    dotPatternDensity={dotDensity}
                    dotPatternFillSize={dotFillSize}
                    dotPatternPulseVariation={dppv}
                    dotPatternPulseSpeed={dpps}
                    fresnelIntensity={fresInt}
                    fresnelMin={fresMin}
                    fresnelMax={fresMax}
                    globalColorIntensity={intensity}
                    gradientColorFrom={earthGradientFrom}
                    gradientColorTo={earthGradientTo}
                    toneMapped={true}
                />
            </mesh>
        </group>
    );
}

useTexture.preload(texturePath("texture_earth_mask_small.jpg"));
useTexture.preload(texturePath("texture_single_dot_pattern.png"));
