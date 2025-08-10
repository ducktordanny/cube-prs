import {
  CORE_MATERIAL_COLOR,
  CUBE_OFFSET,
  CUBELET_GAP,
  CUBELET_SIZE,
  FACE_COLORS,
  N,
  STICKER_SCALE,
  Z_FIGHTING_EPSILON,
} from './draw-3x3-cube.const';
import {
  BoxGeometry,
  ColorRepresentation,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three';

export function draw3x3Cube(rootAddCb: (cubeletGroup: Group) => void): void {
  const coreMaterial = new MeshStandardMaterial({
    color: CORE_MATERIAL_COLOR,
  });
  const cubeletGeometry = new BoxGeometry(
    CUBELET_SIZE - CUBELET_GAP,
    CUBELET_SIZE - CUBELET_GAP,
    CUBELET_SIZE - CUBELET_GAP,
  );
  const stickerGeometry = new PlaneGeometry(
    CUBELET_SIZE * STICKER_SCALE,
    CUBELET_SIZE * STICKER_SCALE,
  );

  const createSticker = (color: ColorRepresentation) =>
    new Mesh(stickerGeometry, new MeshBasicMaterial({ color }));

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      for (let z = 0; z < N; z++) {
        const cubeletGroup = new Group();
        const coreMesh = new Mesh(cubeletGeometry, coreMaterial);
        cubeletGroup.add(coreMesh);
        cubeletGroup.position.set(
          x * CUBELET_SIZE - CUBE_OFFSET,
          y * CUBELET_SIZE - CUBE_OFFSET,
          z * CUBELET_SIZE - CUBE_OFFSET,
        );

        const faceOffset =
          (CUBELET_SIZE - CUBELET_GAP) / 2 + Z_FIGHTING_EPSILON;

        if (y === N - 1) {
          const sticker = createSticker(FACE_COLORS.U);
          sticker.position.y = faceOffset;
          sticker.rotateX(-Math.PI / 2);
          cubeletGroup.add(sticker);
        }
        if (y === 0) {
          const sticker = createSticker(FACE_COLORS.D);
          sticker.position.y = -faceOffset;
          sticker.rotateX(Math.PI / 2);
          cubeletGroup.add(sticker);
        }
        if (x === 0) {
          const sticker = createSticker(FACE_COLORS.L);
          sticker.position.x = -faceOffset;
          sticker.rotateY(-Math.PI / 2);
          cubeletGroup.add(sticker);
        }
        if (x === N - 1) {
          const sticker = createSticker(FACE_COLORS.R);
          sticker.position.x = faceOffset;
          sticker.rotateY(Math.PI / 2);
          cubeletGroup.add(sticker);
        }
        if (z === N - 1) {
          const sticker = createSticker(FACE_COLORS.F);
          sticker.position.z = faceOffset;
          cubeletGroup.add(sticker);
        }
        if (z === 0) {
          const sticker = createSticker(FACE_COLORS.B);
          sticker.position.z = -faceOffset;
          sticker.rotateY(Math.PI);
          cubeletGroup.add(sticker);
        }

        rootAddCb(cubeletGroup);
      }
    }
  }
}
