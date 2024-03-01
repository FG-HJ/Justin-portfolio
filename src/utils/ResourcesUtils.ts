import { DeviceType } from "../constants/ProjectsData.ts";

export const MODEL_DIR = "./models/";
export const TEXTURE_DIR = "./textures/";

export function modelPath(modelType: DeviceType) {
    return `${MODEL_DIR}${modelType === "laptop" ? "laptop_anim.glb" : "smartphoneV2.glb"}`;
}

export function texturePath(textureName: string) {
    return `${TEXTURE_DIR}${textureName}`;
}
