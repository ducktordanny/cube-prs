import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';

import {
  AmbientLight,
  Color,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

import { build3x3Cube } from './utils/build-3x3-cube.util';

@Component({
  selector: 'prs-rubiks-cube',
  template: '<div #base class="rubiks-cube-base"></div>',
  styleUrl: './rubiks-cube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RubiksCubeComponent implements AfterViewInit {
  private readonly base = viewChild<ElementRef<HTMLDivElement>>('base');

  private readonly root = new Group();
  private readonly scene = new Scene();
  private readonly renderer = new WebGLRenderer({ antialias: true });
  private readonly camera = new PerspectiveCamera(25, 1, 0.1, 100);
  private readonly light = new DirectionalLight(0xffffff, 1.1);

  ngAfterViewInit(): void {
    const baseElement = this.base()?.nativeElement;
    if (!baseElement) return;

    this.scene.background = new Color('#ffffff');
    this.renderer.setPixelRatio(window.devicePixelRatio);
    baseElement.append(this.renderer.domElement);

    const ro = new ResizeObserver(() => this.rerender(baseElement));
    ro.observe(baseElement!);

    this.camera.position.set(4.2, 4.4, 6);
    this.camera.lookAt(0, 0, 0);
    this.light.position.set(4, 8, 6);
    this.scene.add(this.light, new AmbientLight(0xffffff, 0.35));
    this.scene.add(this.root);
    build3x3Cube((cubeletGroup) => this.root.add(cubeletGroup));

    this.rerender(baseElement);
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
}
