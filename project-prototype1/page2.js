import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const glitchCanvas = document.getElementById('glitch');
const gctx         = glitchCanvas.getContext('2d');
const loader = new GLTFLoader();

controls = new OrbitControls(camera, renderer.domElement);

init();
animate();

/* ---------- UPLOAD → GLITCH ---------- */
let kept = 0;
const glitchImgs = [];
const texLoader = new THREE.TextureLoader();

async function onUpload(e){
  const files = [...e.target.files];
  if (!files.length) return;

  const room = Math.max(0, MAX_KEEP - kept);
  const take = files.slice(0, room);

  for (const f of take){
    kept++;
    const url = URL.createObjectURL(f);
    spawnPhoto(url);
    glitchImgs.push(await urlToImage(url));
    setTimeout(()=> URL.revokeObjectURL(url), 15000);
  }
  if (kept >= MAX_KEEP) startGlitch();
  e.target.value = '';
}

function spawnPhoto(url){
  texLoader.load(url, tex=>{
    tex.colorSpace = THREE.SRGBColorSpace;
    const w = tex.image?.width || 1024;
    const h = tex.image?.height || 768;
    const a = w/h;
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1,1),
      new THREE.MeshBasicMaterial({ map:tex, side:THREE.DoubleSide, transparent:true, opacity:0.95 })
    );
    const baseW = 2.2;
    plane.scale.set(baseW, baseW/a, 1);
    plane.position.set(rand(-8,8), rand(-1.5,1.5), rand(-8,8));
    plane.rotation.set(rand(-0.2,0.2), rand(0,Math.PI*2), 0);
    plane.userData.baseY = plane.position.y;
    plane.userData.phase = Math.random()*Math.PI*2;
    plane.userData.speed = 0.2 + Math.random()*0.3;
    world.add(plane);
    objs.push(plane);
    interactables.add(plane);
  });
}
function urlToImage(url){ return new Promise(r=>{ const i=new Image(); i.onload=()=>r(i); i.src=url; }); }

/* ---------- GLITCH EFFECT ---------- */
function startGlitch(){
  if (!glitchImgs.length) return;

  resizeGlitch();
  glitchCanvas.classList.remove('hidden');
  addEventListener('resize', resizeGlitch);

  let t=0, density=14, tile=64, max=520;
  gctx.fillStyle='#000';
  gctx.fillRect(0,0,glitchCanvas.width,glitchCanvas.height);

  (function draw(){
    t++;
    if (t%28===0){ gctx.fillStyle='#000'; gctx.fillRect(0,0,glitchCanvas.width,glitchCanvas.height); }

    for (let i=0;i<density;i++){
      const img = glitchImgs[(Math.random()*glitchImgs.length)|0];
      const w = Math.max(8, tile + (Math.random()*20-10));
      const h = Math.max(8, w*(img.height/img.width));
      const x = Math.random()*(glitchCanvas.width - w);
      const y = Math.random()*(glitchCanvas.height - h);
      gctx.drawImage(img, x, y, w, h);
    }

    if (t%12===0) density += 5;
    if (t%20===0) tile = Math.max(10, tile-6);
    if (t%25===0) lineShift();

    (t<max) ? requestAnimationFrame(draw) : endGlitch();
  })();

  function lineShift(){
    const y = (Math.random()*(glitchCanvas.height-8))|0;
    const h = (4+Math.random()*24)|0;
    const slice = gctx.getImageData(0,y,glitchCanvas.width,h);
    gctx.putImageData(slice, (Math.random()*80-40)|0, y);
  }
  function resizeGlitch(){
    glitchCanvas.width = innerWidth;
    glitchCanvas.height = innerHeight;
  }
  function endGlitch(){
    glitchCanvas.classList.add('fade-out');
    setTimeout(()=>{
      removeEventListener('resize', resizeGlitch);
      glitchCanvas.remove();
      document.body.style.background = '#000';
    }, 4200);
  }
}





// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// const raycaster = new THREE.Raycaster();
// const ndc = new THREE.Vector2();
// let scene, camera, renderer, controls, world;
// let canvas;
// const objs = [];
// const bodies = [];
// const targetRot = new THREE.Vector2(0, 0)
// let webcamMesh = null;
// let videoEl = null;

// window.addEventListener('click', () => {
//   if (!webcamMesh) enableWebcamFloating();
// }, { once: true });

// async function enableWebcamFloating() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

//     videoEl = document.createElement('video');
//     videoEl.srcObject = stream;
//     videoEl.muted = true;
//     videoEl.playsInline = true;
//     await videoEl.play();

//     const tex = new THREE.VideoTexture(videoEl);
//     tex.colorSpace = THREE.SRGBColorSpace;
//     tex.minFilter = THREE.LinearFilter;
//     tex.magFilter = THREE.LinearFilter;

//     const geo = new THREE.PlaneGeometry(1, 1);
//     const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: true, opacity: 0.98 });
//     webcamMesh = new THREE.Mesh(geo, mat);

//     const setAspect = () => {
//       const w = videoEl.videoWidth || 1280;
//       const h = videoEl.videoHeight || 720;
//       const aspect = w / h;
//       // 기준 너비를 살짝 크게 주고(2.8) 높이는 비율로
//       const baseWidth = 2.8;
//       webcamMesh.scale.set(baseWidth, baseWidth / aspect, 1);
//     };
//     if (videoEl.readyState >= 2) setAspect(); else videoEl.addEventListener('loadeddata', setAspect, { once: true });

//     const rand = (a, b) => a + Math.random() * (b - a);
//     webcamMesh.position.set(rand(-6, 6), rand(-1.2, 1.2), rand(-6, 6));
//     webcamMesh.rotation.y = Math.random() * Math.PI * 2;

//     webcamMesh.userData.baseY = webcamMesh.position.y;
//     webcamMesh.userData.floatPhase = Math.random() * Math.PI * 2;
//     webcamMesh.userData.floatSpeed = 0.22 + Math.random() * 0.25;

//     world.add(webcamMesh);
//     objs.push(webcamMesh);

//     console.log('Webcam floating enabled');
//   } catch (err) {
//     console.warn('Camera permission denied or error:', err);
//     try {
//       const note = document.createElement('div');
//       note.textContent = 'Camera blocked — enable to float live video.';
//       Object.assign(note.style, {
//         position: 'absolute', top: '12px', left: '12px', color: '#fff7b0',
//         background: 'rgba(0,0,0,.45)', padding: '6px 10px', borderRadius: '10px',
//         fontFamily: 'retros, sans-serif', fontSize: '12px'
//       });
//       document.body.appendChild(note);
//       setTimeout(()=> note.remove(), 4000);
//     } catch {}
//   }
// }

// //   배치/무작위 설정
// const SPREAD = {
//   rangeXZ: 20,
//   rangeY:  4,
//   minGap:  1.2
// };

// const INITIAL_RANDOM = {
//   sizeBase: 3.0,
//   scaleJitterMin: 0.95,
//   scaleJitterMax: 1.8
// };

// //   카오스(클릭 복제) 설정
// const CHAOS = {
//   batchMin: 10, batchMax: 24, maxObjects: 1200,
//   scaleMin: 0.6, scaleMax: 1.8,
//   posJitterXZ: 6, posJitterY: 2.5,
//   velMin: -0.06, velMax: 0.06, damping: 0.995
// };

// //  오디오 
// const bgm = document.getElementById('bgm');
// const clickSound = new Audio('assets/soundscape.mp3');
// bgm.loop = true;
// clickSound.loop = true;

// // 생각거리 질문들
// const QUESTIONS = [
//   "What fears do we face when digital memory disappears?",
//   "How do digital images themselves show signs of decay?", 
//   "What are the consequences of human reliance on digital systems for their identity, memory, and work?",
//   "What are other/new possible systems or mediums that could emerge to replace or evolve beyond digital?",
//   "How could giving digital technologies a personality change the way we use and understand them?"
//   // "When did the familiar start to feel strange?",
//   // "What happens when you stare too long at something you know?",
//   // "How does repetition change meaning?",
//   // "Can you remember without context?",
//   // "What if familiarity is just a glitch of memory?",
//   // "Is your memory organic or digital?",
//   // "Are you observing, or being observed?",
//   // "Can you archive a feeling?",
//   // "When everything becomes data, what remains real?",
//   // "Is forgetting another way of seeing?",
//   // "Where does your memory start and where does it fade out?"
// ];

// // Make question in random position
// function spawnQuestion() {
//   const el = document.createElement('div');
//   el.className = 'floatingQuestion';
//   el.textContent = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
//   document.body.appendChild(el);

//   const x = Math.random() * (window.innerWidth - 300);
//   const y = Math.random() * (window.innerHeight - 100);
//   el.style.left = `${x}px`;
//   el.style.top = `${y}px`;

//   requestAnimationFrame(() => el.style.opacity = 1);
//   setTimeout(() => el.style.opacity = 0, 6000);
//   setTimeout(() => el.remove(), 8000);
// }

// setInterval(spawnQuestion, 6000);

// init();
// animate();

// //   초기화 
// function init() {
//   // Scene + Cubemap
//   scene = new THREE.Scene();
//   const cube = new THREE.CubeTextureLoader().load([
//     'assets/px.png','assets/nx.png','assets/py.png',
//     'assets/ny.png','assets/pz.png','assets/nz.png'
//   ]);
//   scene.background = cube;
//   scene.environment = cube;

//   // Renderer
//   canvas = document.querySelector('#webgl');
//   renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   canvas.classList.add('grab');

//   // Camera + Controls
//   camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
//   camera.position.set(0, 1.6, 8);
//   controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.enablePan = false;

//   // Light
//   scene.add(new THREE.AmbientLight(0xffffff, 1.5));
//   const dir = new THREE.DirectionalLight(0xffffff, 2);
//   dir.position.set(5, 10, 7);
//   scene.add(dir);

//   // World
//   world = new THREE.Group();
//   scene.add(world);

//   // 모델 로드 (각 2개씩 = 12개) — 새로고침마다 위치/크기 랜덤 + 서로 안겹치게
//   const files = ['chair.glb','ugg.glb','kitty.glb','lotion.glb','mouthwash.glb','airpodmax.glb', 'remote.glb', 'hydroflask.glb'];
//   const loader = new GLTFLoader();

//   files.forEach((name) => {
//     loader.load(`./models/${name}`, (gltf) => {
//       const base = setupAndPlaceInitial(gltf.scene); // 원본 1개
//       addOriginal(base);

//       const copy = setupAndPlaceInitial(base.clone(true)); // 복제 1개
//       copy.traverse(ch => { if (ch.isMesh && ch.material) ch.material = ch.material.clone(); });
//       addOriginal(copy);
//     });
//   });

//   // 이벤트
//   window.addEventListener('resize', onResize);
//   window.addEventListener('pointermove', onPointerMove);
//   window.addEventListener('click', onClick);
//   onResize();
// }

// //   초기 오브젝트: 정규화 + 랜덤 스케일 + 충돌 없이 위치 배치
// function setupAndPlaceInitial(obj) {
//   // 머티리얼 독립
//   obj.traverse(ch => { if (ch.isMesh && ch.material) ch.material = ch.material.clone(); });

//   // 1) 크기 정규화 (가장 긴 변을 1로) 후, 장면 기준 크기로 스케일
//   const box = new THREE.Box3().setFromObject(obj);
//   const size = new THREE.Vector3(); box.getSize(size);
//   const maxDim = Math.max(size.x, size.y, size.z) || 1;
//   const baseScale = (1 / maxDim) * INITIAL_RANDOM.sizeBase;

//   // 2) 랜덤 스케일 가중 — 새로고침 때마다 달라짐
//   const jitter = THREE.MathUtils.lerp(INITIAL_RANDOM.scaleJitterMin, INITIAL_RANDOM.scaleJitterMax, Math.random());
//   obj.scale.setScalar(baseScale * jitter);

//   // 3) 회전 랜덤
//   obj.rotation.y = Math.random() * Math.PI * 2;

//   // 4) 겹치지 않게 자리 찾기
//   const radius = getBoundingRadius(obj);
//   const pos = findNonOverlappingPosition(radius);
//   obj.position.copy(pos);

//   // 5) 부유 파라미터
//   obj.userData.baseY = obj.position.y;
//   obj.userData.floatPhase = Math.random() * Math.PI * 2;
//   obj.userData.floatSpeed = 0.2 + Math.random() * 0.3;

//   return obj;
// }

// //   원본 월드 등록(충돌 체크용 바디 목록 포함)
// function addOriginal(obj) {
//   world.add(obj);
//   objs.push(obj);
//   bodies.push({ obj, radius: getBoundingRadius(obj) });
// }

// //   클릭 → 카오스 복제 (혼잡하게, 겹침 허용) 
// function onClick(e) {
//   // 첫 상호작용에서 배경음 시작
//   if (bgm && bgm.paused) bgm.play().catch(()=>{});
//   clickSound.currentTime = 0;
//   clickSound.play().catch(()=>{});

//   ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
//   raycaster.setFromCamera(ndc, camera);
//   const hit = raycaster.intersectObjects(world.children, true)[0];
//   if (!hit) return;

//   let root = hit.object;
//   while (root.parent && root.parent !== world) root = root.parent;

//   const remain = CHAOS.maxObjects - objs.length;
//   if (remain <= 0) return;

//   const n = Math.min(remain, Math.floor(CHAOS.batchMin + Math.random() * (CHAOS.batchMax - CHAOS.batchMin + 1)));
//   for (let i = 0; i < n; i++) spawnClone(root);
// }

// //  복제 생성(카오스 — 겹침 허용)
// function spawnClone(source) {
//   const clone = source.clone(true);
//   clone.traverse(ch => { if (ch.isMesh && ch.material) ch.material = ch.material.clone(); });

//   const s = THREE.MathUtils.lerp(CHAOS.scaleMin, CHAOS.scaleMax, Math.random());
//   clone.scale.multiplyScalar(s);

//   clone.position.add(new THREE.Vector3(
//     (Math.random() - 0.5) * CHAOS.posJitterXZ,
//     (Math.random() - 0.5) * CHAOS.posJitterY,
//     (Math.random() - 0.5) * CHAOS.posJitterXZ
//   ));

//   clone.userData.vel = new THREE.Vector3(
//     THREE.MathUtils.lerp(CHAOS.velMin, CHAOS.velMax, Math.random()),
//     THREE.MathUtils.lerp(CHAOS.velMin, CHAOS.velMax, Math.random()),
//     THREE.MathUtils.lerp(CHAOS.velMin, CHAOS.velMax, Math.random())
//   );

//   clone.userData.baseY = clone.position.y;
//   clone.userData.floatPhase = Math.random() * Math.PI * 2;
//   clone.userData.floatSpeed = 0.2 + Math.random() * 0.5;

//   world.add(clone);
//   objs.push(clone);
// }

// //   비주얼 업데이트
// function onPointerMove(e) {
//   const x = (e.clientX / window.innerWidth) * 2 - 1;
//   const y = (e.clientY / window.innerHeight) * 2 - 1;
//   targetRot.set(y * 0.12, x * 0.2);
// }

// function onResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate(time = 0) {
//   requestAnimationFrame(animate);
//   const t = time * 0.001;
//   controls.update();

//   world.rotation.x += (targetRot.x - world.rotation.x) * 0.06;
//   world.rotation.y += (targetRot.y - world.rotation.y) * 0.06;

//   for (const obj of objs) {
//     // 드리프트(복제에만 있음)
//     if (obj.userData.vel) {
//       obj.position.add(obj.userData.vel);
//       obj.userData.vel.multiplyScalar(CHAOS.damping);
//     }
//     // 부유 + 느린 회전
//     const f = (obj.userData.floatPhase || 0) + t * (obj.userData.floatSpeed || 0.25);
//     obj.position.y = (obj.userData.baseY ?? obj.position.y) + Math.sin(f) * 0.12;
//     obj.rotation.y += 0.003;
//   }

//   renderer.render(scene, camera);
// }

// function randomPos() {
//   return new THREE.Vector3(
//     (Math.random() - 0.5) * SPREAD.rangeXZ,
//     (Math.random() - 0.5) * SPREAD.rangeY,
//     (Math.random() - 0.5) * SPREAD.rangeXZ
//   );
// }
// function getBoundingRadius(obj) {
//   const box = new THREE.Box3().setFromObject(obj);
//   const s = new THREE.Vector3(); box.getSize(s);
//   return Math.max(s.x, s.y, s.z) * 0.5;
// }
// function findNonOverlappingPosition(radius, maxTries = 80) {
//   for (let i = 0; i < maxTries; i++) {
//     const p = randomPos();
//     if (p.distanceTo(camera.position) < radius + 2.2) continue;
//     let ok = true;
//     for (const b of bodies) {
//       const minDist = b.radius + radius + SPREAD.minGap;
//       if (p.distanceTo(b.obj.position) < minDist) { ok = false; break; }
//     }
//     if (ok) return p;
//   }

//   return randomPos();
// }

// // Photo uploading
// const upload = document.getElementById('photoUpload');
// const texLoader = new THREE.TextureLoader();

// function spawnPhoto(url) {
//   texLoader.load(url, (tex) => {
//     tex.colorSpace = THREE.SRGBColorSpace;

//     const w = tex.image?.width || 1024;
//     const h = tex.image?.height || 768;
//     const aspect = w / h;

//     const plane = new THREE.Mesh(
//       new THREE.PlaneGeometry(1, 1),
//       new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: true, opacity: 0.95 })
//     );

//     // scale by aspect (simple, readable)
//     const baseW = 2.2;
//     plane.scale.set(baseW, baseW / aspect, 1);

//     // random placement + gentle drift
//     const R = (a, b) => a + Math.random() * (b - a);
//     plane.position.set(R(-8, 8), R(-1.5, 1.5), R(-8, 8));
//     plane.rotation.set(R(-0.2, 0.2), R(0, Math.PI * 2), 0);

//     // float params (so it doesn't “run away”)
//     plane.userData.baseY = plane.position.y;
//     plane.userData.floatPhase = Math.random() * Math.PI * 2;
//     plane.userData.floatSpeed = 0.2 + Math.random() * 0.3;
//     plane.userData.vel = new THREE.Vector3(R(-0.01, 0.01), R(-0.002, 0.002), R(-0.01, 0.01));

//     world.add(plane);
//     objs.push(plane);
//   });
// }

// if (upload) {
//   upload.addEventListener('change', (e) => {
//     [...e.target.files].forEach((file) => {
//       const url = URL.createObjectURL(file);
//       spawnPhoto(url);
//       // free the blob URL later
//       setTimeout(() => URL.revokeObjectURL(url), 15000);
//     });
//   });
// }
