import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

import {
  AmbientLight,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { draw3x3Cube } from './utils/draw-3x3-cube.util';

@Component({
  selector: 'prs-rubiks-cube',
  template: '<div #base class="rubiks-cube-base"></div>',
  styleUrl: './rubiks-cube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RubiksCubeComponent implements AfterViewInit {
  private readonly base =
    viewChild.required<ElementRef<HTMLDivElement>>('base');

  private readonly root = new Group();
  private readonly scene = new Scene();
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  private readonly camera = new PerspectiveCamera(25, 1, 0.1, 100);
  private readonly light = new DirectionalLight(0xffffff, 1.1);
  private readonly controls = new OrbitControls(
    this.camera,
    this.renderer.domElement,
  );

  ngAfterViewInit(): void {
    const baseElement = this.base().nativeElement;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    baseElement.append(this.renderer.domElement);

    const ro = new ResizeObserver(() => this.rerender(baseElement));
    ro.observe(baseElement!);

    this.camera.position.set(4.2, 4.4, 6);
    this.camera.lookAt(0, 0, 0);
    this.light.position.set(4, 8, 6);
    this.scene.add(this.light, new AmbientLight(0xffffff, 0.35));
    this.scene.add(this.root);
    draw3x3Cube((cubeletGroup) => this.root.add(cubeletGroup));

    this.rerender(baseElement);
    this.initOrbitControl(baseElement);

    // TODO: Need to clean up things in `ngOnDestroy`
  }

  private rerender(baseElement: HTMLDivElement): void {
    this.renderer.setSize(
      baseElement.clientWidth,
      baseElement.clientHeight || 1,
      false,
    );
    this.camera.aspect =
      baseElement.clientWidth / (baseElement.clientHeight || 1);
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  private initOrbitControl(baseElement: HTMLDivElement): void {
    this.controls.enablePan = false;
    this.controls.enableDamping = false;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 12;
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.controls.addEventListener('change', () => this.rerender(baseElement));
  }
}
