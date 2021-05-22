import * as THREE from 'three';
import { Point2D, Smile } from './types';
import { Text } from 'troika-three-text';

export class Renderer {
  private readonly camera: THREE.Camera;
  private readonly scene: THREE.Scene;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly uniforms: any;
  private readonly message: Text;
  private readonly text: Text;

  constructor() {
    const container = document.getElementById('container')!;
    this.camera = new THREE.Camera();
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    this.message = new Text();
    this.text = new Text();
    this.message.text = 'Hello';
    this.message.font = './fonts/atma-v8-latin-regular.woff';
    this.message.fontSize = 0.05;
    this.message.letterSpacing = 0;
    this.message.position.setY(0.95);

    this.uniforms = {
      u_time: { type: 'f', value: 1.0 },
      u_resolution: { type: 'v2', value: new THREE.Vector2() },
      u_mouse: { type: 'v2', value: new THREE.Vector3() },
      u_target: { type: 'v2', value: new THREE.Vector2(0.5, 0.5) },
      u_happy: { type: 'f', value: 1.0 },
      u_smile_visible: { type: 'b', value: false },
      u_killed_smile: { type: 'b', value: false },
      u_shot: { type: 'b', value: false },
      u_lives: { type: 'n', value: 10 }
    };
    this.updateLives(this.uniforms.u_lives.value);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('vertexShader')!.textContent!,
      fragmentShader: document.getElementById('fragmentShader')!.textContent!
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    this.message.sync();
    this.text.sync();
    this.scene.add(this.message);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(this.renderer.domElement);

    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize, false);

  }

  onWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
    this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
  }

  render() {
    this.uniforms.u_time.value += 0.05;
    this.renderer.render(this.scene, this.camera);
    this.uniforms.u_shot.value = false;
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  }

  updateSmile(smile: Smile) {
    const { position, type, visible } = smile;
    this.uniforms.u_target.value.setX(position[0]);
    this.uniforms.u_target.value.setY(position[1]);
    this.uniforms.u_happy.value = type;
    this.uniforms.u_smile_visible.value = visible;
  }

  updateTarget(target: Point2D) {
    this.uniforms.u_mouse.value.setX(target[0]);
    this.uniforms.u_mouse.value.setY(target[1]);
  }

  gameOver() {
    alert('Game Over');
  }

  hitSmile(killed: boolean) {
    this.uniforms.u_shot.value = true;
    this.uniforms.u_killed_smile = killed;
  }

  updateLives(lives: number) {
    this.uniforms.u_lives.value = lives;
    this.message.text = `Lives: ${lives}`;
  }
  updateText(message: string) {
    this.text.text = message; 
  }
}

