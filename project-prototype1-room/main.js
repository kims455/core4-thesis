import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/DRACOLoader.js';

const MODEL_PATH = 'models/room.glb';
const hud = document.querySelector('.hud');

// const loader = new GLTFLoader();

loader.load( 'models/room.glb', function ( gltf ) {

  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

function animation() {
  requestAnimationFrame(animation);
  world.step();
  mouseBall.update(mousePos);
  bodies.forEach(b=>b.update());
  renderer.render(scene, camera);
}

animate();

// renderer
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x111419, 1);

// scene/camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.01, 1000);
camera.position.set(3,2,4);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// lights
scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 1));
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(4,6,3);
scene.add(dl);

// glb loader (supports Draco)
const loader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/');
loader.setDRACOLoader(draco);