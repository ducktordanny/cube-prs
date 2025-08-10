import { Component, signal } from '@angular/core';
import { RubiksCubeComponent } from './components/rubiks-cube/rubiks-cube.component';

@Component({
  selector: 'app-root',
  imports: [RubiksCubeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('cube-prs');
}
