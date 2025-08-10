import { ColorRepresentation } from 'three';
import { FaceColors } from './draw-3x3-cube.types';

export const SPEED = 1;

export const FACE_COLORS: FaceColors = {
  U: 0xffffff,
  D: 0xffff00,
  L: 0xffa500,
  R: 0xff0000,
  F: 0x00ff00,
  B: 0x0000ff,
};
export const CORE_MATERIAL_COLOR: ColorRepresentation = 0x111111;

export const N = 3;
export const CUBELET_SIZE = 0.75;
export const CUBELET_GAP = 0.06;
export const STICKER_SCALE = 0.9;
export const CUBE_OFFSET = ((N - 1) * CUBELET_SIZE) / 2;
export const Z_FIGHTING_EPSILON = 0.005;
