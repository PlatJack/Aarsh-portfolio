import * as THREE from 'three';
import VertShader from '../Shaders/VertShader';
import FragmentShader from '../Shaders/FragmentShader';

const width = window.innerWidth;
const height = window.innerHeight;
const start = Date.now();

class DisplacementSphere {
  constructor(container, props) {
    this.container = container;
    this.props = props;

    this.renderer = new THREE.WebGLRenderer({
      antialiasing: true,
      pixelRatio: window.devicePixelRatio,
      alpha: true,
    });
    this.camera = new THREE.PerspectiveCamera( 55, width / height, 0.1, 5000 );
    this.scene = new THREE.Scene();
    this.light = new THREE.DirectionalLight(0xffffff, 0.6);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

    this.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib["ambient"],
      THREE.UniformsLib["lights"],
      {time: { type: "f", value: 0 }},
      THREE.ShaderLib.phong.uniforms
    ]);

    this.material = new THREE.ShaderMaterial( {
      uniforms: this.uniforms,
      vertexShader: VertShader,
      fragmentShader: FragmentShader,
      lights: true,
    });

    this.geometry = new THREE.SphereGeometry(30, 200, 200);
    this.sphere = new THREE.Mesh(this.geometry, this.material);
  }

  init = () => {
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(width, height);
    this.camera.position.z = 200;

    this.light.position.z = 200;
    this.light.position.x = 100;
    this.light.position.y = 100;
    this.scene.add(this.light);
    this.scene.add(this.ambientLight);

    this.scene.add(this.sphere);
    this.sphere.position.x = 20;
    this.sphere.position.y = 10;
    this.sphere.position.z = 0;
    this.sphere.modifier = Math.random();
    this.sphere.material.transparent = true;
    this.sphere.material.opacity = 1 * Math.random();

    this.container.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  }

  render = () => {
    this.uniforms.time.value = .00005 * (Date.now() - start);

  	this.sphere.rotation.y += 0.001;
  	this.sphere.rotation.z += 0.001;
  	this.sphere.rotation.x += 0.001;

  	this.camera.position.z =  52;

    this.renderer.render(this.scene, this.camera);
  }
}

export default DisplacementSphere;