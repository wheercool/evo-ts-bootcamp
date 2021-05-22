declare module 'troika-three-text' {

  export class Text extends THREE.Object3D {
    font: string;
    text: string;
    fontSize: number;
    color: number;
    letterSpacing: number;
    sync(): void;
  }
}
