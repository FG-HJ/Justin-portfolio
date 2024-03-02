import * as THREE from "three";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import fragmentShader from "../../assets/shader/ImageFadeFragmentShader.glsl?raw";
import vertexShader from "../../assets/shader/ImageFadeVertexShader.glsl?raw";

type U = {
    [name: string]:
        | THREE.CubeTexture
        | THREE.Texture
        | Int32Array
        | Float32Array
        | THREE.Matrix4
        | THREE.Matrix3
        | THREE.Quaternion
        | THREE.Vector4
        | THREE.Vector3
        | THREE.Vector2
        | THREE.Color
        | number
        | boolean
        | Array<unknown>
        | null;
};

function shaderMaterial<T extends U>(
    uniforms: T,
    vertexShader: string,
    fragmentShader: string,
    onInit?: (material?: THREE.ShaderMaterial) => void,
) {
    const material = class extends THREE.ShaderMaterial {
        public key: string = "";
        constructor(parameters = {}) {
            const entries = Object.entries(uniforms);
            // Create unforms and shaders
            super({
                uniforms: entries.reduce((acc, [name, value]) => {
                    const uniform = THREE.UniformsUtils.clone({
                        [name]: { value },
                    });
                    return {
                        ...acc,
                        ...uniform,
                    };
                }, {}),
                vertexShader,
                fragmentShader,
            });
            // Create getter/setters
            entries.forEach(([name]) =>
                Object.defineProperty(this, name, {
                    get: () => this.uniforms[name].value,
                    set: v => (this.uniforms[name].value = v),
                }),
            );

            // Assign parameters, this might include uniforms
            Object.assign(this, parameters);
            // Call onInit
            if (onInit) onInit(this);
        }
    } as unknown as typeof THREE.ShaderMaterial & { key: string } & T;
    material.key = THREE.MathUtils.generateUUID();
    return material;
}

const testShaderDefaultProps = {
    tex: new THREE.Texture(),
    textureCount: 1,
    currentIdx: 0,
    targetIdx: 0,
    alpha: 0,
};

export const ImageFadeMaterial = shaderMaterial(
    testShaderDefaultProps,
    vertexShader,
    fragmentShader,
);

extend({ ImageFadeMaterial });

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            imageFadeMaterial: ReactThreeFiber.Node<
                typeof ImageFadeMaterial &
                    JSX.IntrinsicElements["shaderMaterial"],
                typeof ImageFadeMaterial
            >;
        }
    }
}