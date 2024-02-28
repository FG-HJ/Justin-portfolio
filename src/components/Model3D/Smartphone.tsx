/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";
import { DeviceData } from "../../constants/ProjectsData.ts";
import { modelPath } from "../../utils/ResourcesUtils.ts";

type GLTFResult = GLTF & {
    nodes: {
        Cube: THREE.Mesh;
        Cube001: THREE.Mesh;
        Cube002: THREE.Mesh;
        Cube003: THREE.Mesh;
        Cylinder_1: THREE.Mesh;
        Cylinder_2: THREE.Mesh;
        Cylinder001_1: THREE.Mesh;
        Cylinder001_2: THREE.Mesh;
    };
    materials: {
        black: THREE.MeshStandardMaterial;
        ["black.001"]: THREE.MeshStandardMaterial;
        silver: THREE.MeshPhysicalMaterial;
        lens: THREE.MeshStandardMaterial;
    };
};

type SmartphoneProps = {
    device: DeviceData;
    animDelay?: number;
    animDuration?: number;
    inView?: boolean;
} & JSX.IntrinsicElements["group"];

export default function Smartphone({ device, ...props }: SmartphoneProps) {
    const { nodes, materials } = useGLTF(
        modelPath("smartphone"),
        true,
    ) as GLTFResult;

    const rotationMode =
        device.type === "smartphone" && device.deviceOrientation === "portrait"
            ? 0
            : Math.PI / 2;

    return (
        <group rotation-z={rotationMode} {...props} dispose={null}>
            <mesh geometry={nodes.Cube.geometry} material={materials.black} />
            <mesh
                geometry={nodes.Cube001.geometry}
                material={materials["black.001"]}
                position={[1.23132, 1.04433, 0]}
                scale={[1, 0.7143, 0.5689]}
            />
            <mesh
                geometry={nodes.Cube002.geometry}
                material={materials["black.001"]}
                position={[1.23132, 0.13636, 0]}
                scale={[1, 0.28149, 0.5689]}
            />
            <mesh
                geometry={nodes.Cube003.geometry}
                material={materials.silver}
                position={[0.00104, 0.00095, 0.00353]}
                scale={[1, 1, 1.20265]}
            />
            <group
                position={[0.62607, 2.0582, -0.20179]}
                scale={[0.23271, 0.23271, 0.11031]}>
                <mesh
                    geometry={nodes.Cylinder_1.geometry}
                    material={materials["black.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder_2.geometry}
                    material={materials.lens}
                />
            </group>
            <group
                position={[0.97529, 2.27739, 0.17057]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[0.08013, 0.08013, 0.03798]}>
                <mesh
                    geometry={nodes.Cylinder001_1.geometry}
                    material={materials["black.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder001_2.geometry}
                    material={materials.lens}
                />
            </group>
        </group>
    );
}
