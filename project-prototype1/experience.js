import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

localStorage.removeItem('glitchSnapshots_v1');

const canvas       = document.getElementById('webgl');
const uploadInput  = document.getElementById('photoUpload');
const glitchCanvas = document.getElementById('glitch');
const bgm          = document.getElementById('bgm');
const progress     = document.getElementById('progress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressLabel');
const introEl      = document.getElementById('intro');
const shelfEl      = document.getElementById('objectShelf');
const bgColorInput = document.getElementById('bgColor');

function rand(min, max){ return min + Math.random()*(max-min); }
function clamp01(v){ return Math.min(1, Math.max(0, v)); }

const MODELS = [
  'chair.glb','ugg.glb','kitty.glb','lotion.glb',
  'mouthwash.glb','airpodmax.glb','remote.glb','hydroflask.glb'
];

const THUMBS = {
  'chair.glb':'thumbs/chair.gif',
  'ugg.glb':'thumbs/ugg.gif',
  'kitty.glb':'thumbs/kitty.gif',
  'lotion.glb':'thumbs/lotion.gif',
  'mouthwash.glb':'thumbs/mouthwash.gif',
  'airpodmax.glb':'thumbs/airpodmax.gif',
  'remote.glb':'thumbs/remote.gif',
  'hydroflask.glb':'thumbs/hydroflask.gif'
};

const MAX_KEEP = 5;
let kept = 0;
const glitchCtx = glitchCanvas.getContext('2d');
const savedGlitchImgs = [];
const texLoader = new THREE.TextureLoader();

const CHAOS = {
  batchMin: 10, batchMax: 24, maxObjects: 1200,
  scaleMin: 0.6, scaleMax: 1.8,
  posJitterXZ: 6, posJitterY: 2.5,
  velMin: -0.06, velMax: 0.06, damping: 0.995
};

const SNAP_KEY = 'glitchSnapshots_v1';
const SNAP_LIMIT = 20;

const QUESTIONS = [
  "What do you usually keep on your phone that feels important?",
  "How would you feel if all your photos disappeared tomorrow?",
  "What’s the first digital file you ever saved?",
  "Which memory do you revisit the most online?",
  "When was the last time you deleted something and regretted it?",
  "What’s one thing you wish you had backed up?",
  "How do you decide what to save and what to forget?",
  "Do you think digital memories fade, just like human ones?",
  "How do you feel when your storage is full?",
  "What does ‘permanent’ mean in the digital world?",
  "How do you organize your digital life?",
  "What app holds most of your memories?",
  "Have you ever renamed a file and couldn’t find it again?",
  "How many photos of the same moment do you usually take?",
  "Does your device(s) remember you better than you remember yourself?",
  "If your device had emotions, what would it feel?",
  "What would you tell your phone if it could listen?",
  "What would you keep if you could only save one file forever?",
  "What would happen if your memories could delete themselves?"
];

function escapeHTML(s){
  return String(s).replace(/[&<>"']/g, (m)=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

/* ========================= three.js world ============================== */
let scene, camera, renderer, controls, world;
let videoEl = null;
let webcamMesh = null;

const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const hoverables = new Set();
const objects = [];
const bodies  = [];

const lookLerp = new THREE.Vector2(0,0);

initThree();
animate();

/* --- init everything --- */
function initThree(){
  scene = new THREE.Scene();

  const env = new THREE.CubeTextureLoader().load(
    ['px','nx','py','ny','pz','nz'].map(s => `assets/${s}.png`)
  );
  scene.background = env;
  scene.environment = env;

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 8);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;

  scene.add(new THREE.AmbientLight(0xffffff, 1.4));
  const dir = new THREE.DirectionalLight(0xffffff, 2);
  dir.position.set(5,10,7);
  scene.add(dir);

  world = new THREE.Group();
  scene.add(world);

  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('click', onClickAnywhere);
  onResize();

  // first click → play bgm + enable webcam tile
  window.addEventListener('click', ()=>{
    if (bgm && bgm.paused) { bgm.play().catch(()=>{}); }
    if (!webcamMesh) { enableWebcamTile(); }
  }, { once: true });

  // uploads
  if (uploadInput){
    uploadInput.addEventListener('change', onUpload);
  }

  // recolor background
  if (bgColorInput){
    bgColorInput.addEventListener('input', (e)=>{
      const color = new THREE.Color(e.target.value);
      scene.background = color;
    });
  }

  loadSnapshots();

  buildShelf();

  showIntro();
}

/* --- build the GIF shelf (click or drag to add) --- */
function buildShelf(){
  if (!shelfEl) return;

  MODELS.forEach((name)=>{
    const item = document.createElement('div');
    item.className = 'shelf-item';
    item.dataset.model = name;

    const img = document.createElement('img');
    img.className = 'shelf-thumb';
    img.alt = name.replace('.glb','');
    img.src = THUMBS[name] || 'thumbs/fallback.gif';
    item.appendChild(img);

    item.addEventListener('click', ()=>{
      spawnManualObject(name, { inFront: true });
    });

    enableShelfDrag(item, name);
    shelfEl.appendChild(item);
  });
}

/* --- intro overlay: black → greeting → fade --- */
function showIntro(){
  if (!introEl) return;

  setTimeout(()=> introEl.classList.add('reveal'), 600);

  function closeIntro(){
    introEl.classList.add('hide');
    setTimeout(()=> introEl.remove(), 3000);
  }

  const timer = setTimeout(closeIntro, 3000);
  introEl.addEventListener('click', ()=>{ clearTimeout(timer); closeIntro(); });
  window.addEventListener('keydown', (e)=>{
    if (!e.repeat){ clearTimeout(timer); closeIntro(); }
  });
}

function onResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* --- gentle rotation + hover cursor --- */
function onPointerMove(e){
  const x = (e.clientX / window.innerWidth)  * 2 - 1;
  const y = (e.clientY / window.innerHeight) * 2 - 1;

  lookLerp.set(y*0.12, x*0.20);

  ndc.set(x, -y);
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObjects(Array.from(hoverables), true);

  if (hits.length > 0) canvas.classList.add('grab');
  else canvas.classList.remove('grab');
}

/* --- main loop --- */
function animate(t=0){
  requestAnimationFrame(animate);
  controls.update();

  world.rotation.x += (lookLerp.x - world.rotation.x) * 0.06;
  world.rotation.y += (lookLerp.y - world.rotation.y) * 0.06;

  const time = t * 0.001;
  for (const o of objects){
    if (o.userData && o.userData.static) continue;

    if (o.userData && o.userData.vel){
      o.position.add(o.userData.vel);
      o.userData.vel.multiplyScalar(CHAOS.damping);
    }

    const phase = (o.userData?.phase || 0) + time*(o.userData?.speed || 0.25);
    const baseY = (o.userData?.baseY ?? o.position.y);
    o.position.y = baseY + Math.sin(phase)*0.12;

    o.rotation.y += 0.003;
  }

  renderer.render(scene, camera);
}

/* --- normalize a loaded GLTF so sizes feel similar --- */
function normalize(obj){
  obj.traverse((ch)=>{
    if (ch.isMesh && ch.material){
      ch.material = ch.material.clone();
    }
  });

  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = (1 / maxDim) * 3.0 * (0.95 + Math.random()*0.85);

  obj.scale.setScalar(scale);
  obj.rotation.y = Math.random() * Math.PI * 2;
  return obj;
}

/* --- add object to scene + bookkeeping --- */
function addObject(obj){
  world.add(obj);
  objects.push(obj);
  bodies.push({ obj: obj, r: getRadius(obj) });
  hoverables.add(obj);
}

/* --- pick a non-overlapping spot --- */
function getRadius(obj){
  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  box.getSize(size);
  return Math.max(size.x, size.y, size.z) * 0.5;
}

function findSpot(r){
  for (let i=0; i<80; i++){
    const p = new THREE.Vector3(rand(-20,20), rand(-2,2), rand(-20,20));
    if (p.distanceTo(camera.position) < r + 2.2) continue;

    let ok = true;
    for (let j=0; j<bodies.length; j++){
      const b = bodies[j];
      if (p.distanceTo(b.obj.position) <= b.r + r + 1.2) { ok = false; break; }
    }
    if (ok) return p;
  }
  return new THREE.Vector3(rand(-20,20), rand(-2,2), rand(-20,20));
}

function setupAndPlace(obj){
  const r = getRadius(obj);
  const p = findSpot(r);
  obj.position.copy(p);
  obj.userData.baseY = p.y;
  obj.userData.phase = Math.random()*Math.PI*2;
  obj.userData.speed = 0.2 + Math.random()*0.3;
  return obj;
}

/* ===================== manual add / drag / delete ===================== */
/* add from shelf or click */
function spawnManualObject(modelName, options){
  const opts = options || {};
  const loader = new GLTFLoader();

  loader.load(`./models/${modelName}`, (g)=>{
    const obj = normalize(g.scene);
    obj.scale.multiplyScalar(0.9);

    if (opts.worldPos){
      obj.position.copy(opts.worldPos);
    } else if (opts.inFront){
      const dir = new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
      obj.position.copy(camera.position).add(dir.multiplyScalar(4));
      obj.position.y -= 0.4;
    } else {
      obj.position.set(0, 0, -4);
    }

    obj.rotation.set(0, 0, 0);
    obj.userData.static = true;
    obj.userData.speed  = 0;
    obj.userData.phase  = 0;
    obj.userData.baseY  = obj.position.y;
    delete obj.userData.vel;

    addObject(obj);
  });
}

/* drag a GIF from shelf into the world */
function enableShelfDrag(el, modelName){
  let ghost = null;

  function onMove(e){
    if (!ghost) return;
    ghost.style.left = (e.clientX + 8) + 'px';
    ghost.style.top  = (e.clientY + 8) + 'px';
  }

  function onUp(e){
    if (!ghost) return;

    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);

    ndc.set((e.clientX / window.innerWidth)*2 - 1, -(e.clientY / window.innerHeight)*2 + 1);
    raycaster.setFromCamera(ndc, camera);

    const forward = new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion);
    const plane = new THREE.Plane(forward, -camera.position.clone().add(forward.clone().multiplyScalar(4)).dot(forward));

    const hitPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, hitPoint);

    spawnManualObject(modelName, { worldPos: hitPoint });

    ghost.remove();
    ghost = null;
  }

  el.addEventListener('pointerdown', (e)=>{
    e.preventDefault();
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });
}

/* drag objects already in scene */
let draggingObj = null;
let dragOffset  = new THREE.Vector3();

window.addEventListener('pointerdown', (e)=>{
  ndc.set((e.clientX / window.innerWidth)*2 - 1, -(e.clientY / window.innerHeight)*2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hit = raycaster.intersectObjects(Array.from(hoverables), true)[0];

  if (hit && hit.object){
    let root = hit.object;
    while (root.parent && root.parent !== world) root = root.parent;

    draggingObj = root;

    const plane = new THREE.Plane(new THREE.Vector3(0,0,1), -camera.position.z);
    const p = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, p);

    dragOffset.subVectors(draggingObj.position, p);
  }
});

window.addEventListener('pointermove', (e)=>{
  if (!draggingObj) return;

  ndc.set((e.clientX / window.innerWidth)*2 - 1, -(e.clientY / window.innerHeight)*2 + 1);
  raycaster.setFromCamera(ndc, camera);

  const plane = new THREE.Plane(new THREE.Vector3(0,0,1), -camera.position.z);
  const p = new THREE.Vector3();
  raycaster.ray.intersectPlane(plane, p);

  p.add(dragOffset);
  draggingObj.position.copy(p);
});

window.addEventListener('pointerup', ()=>{
  draggingObj = null;
});

/* right-click to delete */
window.addEventListener('contextmenu', (e)=>{
  e.preventDefault();
  ndc.set((e.clientX / window.innerWidth)*2 - 1, -(e.clientY / window.innerHeight)*2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hit = raycaster.intersectObjects(world.children, true)[0];
  if (!hit) return;

  let root = hit.object;
  while (root.parent && root.parent !== world) root = root.parent;

  world.remove(root);
  const idx = objects.indexOf(root);
  if (idx > -1) objects.splice(idx, 1);
});

/* ======================= click = burst clones ========================= */
function onClickAnywhere(e){
  const p = new THREE.Vector2(
    (e.clientX / window.innerWidth)*2 - 1,
    -(e.clientY / window.innerHeight)*2 + 1
  );
  raycaster.setFromCamera(p, camera);
  const hit = raycaster.intersectObjects(world.children, true)[0];
  if (!hit) return;

  let root = hit.object;
  while (root.parent && root.parent !== world) root = root.parent;

  const roomLeft = CHAOS.maxObjects - objects.length;
  if (roomLeft <= 0) return;

  const n = Math.min(roomLeft, Math.floor(CHAOS.batchMin + Math.random()*(CHAOS.batchMax - CHAOS.batchMin + 1)));
  for (let i=0; i<n; i++) makeClone(root);
}

function makeClone(source){
  const c = source.clone(true);
  c.traverse((ch)=>{ if (ch.isMesh && ch.material) ch.material = ch.material.clone(); });

  const s = THREE.MathUtils.lerp(CHAOS.scaleMin, CHAOS.scaleMax, Math.random());
  c.scale.multiplyScalar(s);

  c.position.add(new THREE.Vector3(
    (Math.random()-0.5)*CHAOS.posJitterXZ,
    (Math.random()-0.5)*CHAOS.posJitterY,
    (Math.random()-0.5)*CHAOS.posJitterXZ
  ));

  c.userData.vel = new THREE.Vector3(
    THREE.MathUtils.lerp(CHAOS.velMin, CHAOS.velMax, Math.random()),
    THREE.MathUtils.lerp(CHAOS.velMin, CHAOS.velMax, Math.random()),
    THREE.MathUtils.lerp(CHAOS.velMin, CHAOS.velMax, Math.random())
  );
  c.userData.baseY = c.position.y;
  c.userData.phase = Math.random()*Math.PI*2;
  c.userData.speed = 0.2 + Math.random()*0.5;

  world.add(c);
  objects.push(c);
  hoverables.add(c);
}

/* ============================ webcam tile ============================== */
async function enableWebcamTile(){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    videoEl = document.createElement('video');
    videoEl.srcObject = stream;
    videoEl.muted = true;
    videoEl.playsInline = true;
    await videoEl.play();

    const tex = new THREE.VideoTexture(videoEl);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter  = THREE.LinearFilter;
    tex.magFilter  = THREE.LinearFilter;

    const geo = new THREE.PlaneGeometry(1,1);
    const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: true, opacity: 0.98 });
    webcamMesh = new THREE.Mesh(geo, mat);

    function fit(){
      const w = videoEl.videoWidth  || 1280;
      const h = videoEl.videoHeight || 720;
      const aspect = w / h;
      const baseW = 2.8;
      webcamMesh.scale.set(baseW, baseW/aspect, 1);
    }

    if (videoEl.readyState >= 2) fit();
    else videoEl.addEventListener('loadeddata', fit, { once: true });

    webcamMesh.position.set(rand(-6,6), rand(-1.2,1.2), rand(-6,6));
    webcamMesh.rotation.y = Math.random()*Math.PI*2;
    webcamMesh.userData.baseY = webcamMesh.position.y;
    webcamMesh.userData.phase = Math.random()*Math.PI*2;
    webcamMesh.userData.speed = 0.22 + Math.random()*0.25;

    world.add(webcamMesh);
    objects.push(webcamMesh);
    hoverables.add(webcamMesh);
  }catch(err){
    console.warn('Camera permission denied:', err);
  }
}

/* ============================ uploads ================================= */
function updateProgress(){
  const pct = clamp01(kept / MAX_KEEP);
  if (progressFill)  progressFill.style.width = (pct*100).toFixed(0) + '%';
  if (progressText)  progressText.textContent = `${kept} / ${MAX_KEEP}`;
}

async function onUpload(e){
  const files = Array.from(e.target.files || []);
  if (files.length === 0) return;

  const room = Math.max(0, MAX_KEEP - kept);
  const take  = files.slice(0, room);

  for (let i=0; i<take.length; i++){
    kept++;
    updateProgress();

    const url = URL.createObjectURL(take[i]);
    spawnPhotoPlane(url);
    savedGlitchImgs.push(await asImage(url));
    setTimeout(()=> URL.revokeObjectURL(url), 15000);
  }

  updateProgress();
  if (kept >= MAX_KEEP) startGlitch();

  e.target.value = '';
}

function spawnPhotoPlane(url, opts){
  const options = opts || {};
  texLoader.load(url, (tex)=>{
    tex.colorSpace = THREE.SRGBColorSpace;

    const w = tex.image && tex.image.width  ? tex.image.width  : 1024;
    const h = tex.image && tex.image.height ? tex.image.height : 768;
    const aspect = w / h;

    const mat = new THREE.MeshBasicMaterial({
      map: tex, side: THREE.DoubleSide, transparent: true, opacity: 0.95
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1,1), mat);

    const baseW = options.history ? 1.6 : 2.2;
    mesh.scale.set(baseW, baseW/aspect, 1);

    mesh.position.set(rand(-8,8), rand(-1.5,1.5), rand(-8,8));
    mesh.rotation.set(rand(-0.2,0.2), rand(0,Math.PI*2), 0);

    mesh.userData.baseY = mesh.position.y;
    mesh.userData.phase = Math.random()*Math.PI*2;
    mesh.userData.speed = options.history ? (0.12 + Math.random()*0.18) : (0.2 + Math.random()*0.3);

    world.add(mesh);
    objects.push(mesh);
    hoverables.add(mesh);
  });
}

function asImage(url){
  return new Promise((resolve)=>{
    const img = new Image();
    img.onload = ()=> resolve(img);
    img.src = url;
  });
}

/* =========================== glitch routine =========================== */
function startGlitch(){
  if (savedGlitchImgs.length === 0) return;

  resizeGlitch();
  glitchCanvas.classList.remove('hidden');
  window.addEventListener('resize', resizeGlitch);

  const glitchBg = `hsl(${Math.floor(Math.random()*360)}, 90%, 60%)`;

  let popupTimer = setTimeout(() => {
    alert("Whoa, what just happened? Sorry for the inconvenience. Don't worry, and keep leaving your trace. I will store it for you.");
  }, 4500);

  let t = 0;
  let density = 14;
  let tile = 64;
  const max = 520;

  glitchCtx.fillStyle = glitchBg;
  glitchCtx.fillRect(0,0,glitchCanvas.width, glitchCanvas.height);

  function draw(){
    t++;

    if (t % 28 === 0){
      glitchCtx.fillStyle = glitchBg;
      glitchCtx.fillRect(0,0,glitchCanvas.width, glitchCanvas.height);
    }

    for (let i=0; i<density; i++){
      const img = savedGlitchImgs[(Math.random()*savedGlitchImgs.length)|0];
      const w = Math.max(8, tile + (Math.random()*20-10));
      const h = Math.max(8, w * (img.height / img.width));
      const x = Math.random()*(glitchCanvas.width - w);
      const y = Math.random()*(glitchCanvas.height - h);
      glitchCtx.drawImage(img, x, y, w, h);
    }

    if (t % 12 === 0) density += 5;
    if (t % 20 === 0) tile = Math.max(10, tile-6);
    if (t % 25 === 0) lineShift();

    if (t < max) requestAnimationFrame(draw);
    else endGlitch();
  }
  requestAnimationFrame(draw);

  function lineShift(){
    const y = (Math.random()*(glitchCanvas.height-8))|0;
    const h = (4+Math.random()*24)|0;
    const data = glitchCtx.getImageData(0, y, glitchCanvas.width, h);
    glitchCtx.putImageData(data, (Math.random()*80-40)|0, y);
  }

  function resizeGlitch(){
    glitchCanvas.width  = window.innerWidth;
    glitchCanvas.height = window.innerHeight;
  }

  function endGlitch(){
    window.removeEventListener('resize', resizeGlitch);

    let snapURL = null;
    try { snapURL = glitchCanvas.toDataURL('image/png'); } catch(e){}

    if (snapURL){
      saveSnapshot(snapURL);
      spawnPhotoPlane(snapURL, { history:true });
    }

    glitchCanvas.classList.add('fade-out');

    const onFadeDone = () => {
      glitchCanvas.classList.remove('show');
      glitchCanvas.classList.add('hidden');
      glitchCanvas.classList.remove('fade-out');

      kept = 0;
      savedGlitchImgs.length = 0;
      updateProgress();
      document.body.style.background = '#ffffff';

      const final = document.getElementById('finalMsg');
      if (final && !final.classList.contains('hidden')){
        setTimeout(()=> final.classList.add('fade-out'), 1200);
        setTimeout(()=>{
          final.classList.remove('show','fade-out');
          final.classList.add('hidden');
        }, 2000);
      }
    };

    const dur = getComputedStyle(glitchCanvas).transitionDuration;
    const hasTransition = dur && dur !== '0s';
    if (hasTransition) {
      glitchCanvas.addEventListener('transitionend', onFadeDone, { once:true });
    } else {
      setTimeout(onFadeDone, 1000);
    }
  }
}

/* ==================== save/load glitch snapshots ==================== */
function saveSnapshot(dataUrl){
  try{
    const list = JSON.parse(localStorage.getItem(SNAP_KEY) || '[]');
    list.push({ url: dataUrl, ts: Date.now() });
    while (list.length > SNAP_LIMIT) list.shift();
    localStorage.setItem(SNAP_KEY, JSON.stringify(list));
  }catch(e){
    console.warn('Snapshot save failed:', e);
  }
}

function loadSnapshots(){
  try{
    const list = JSON.parse(localStorage.getItem(SNAP_KEY) || '[]');
    list.forEach((s)=> spawnPhotoPlane(s.url, { history: true }));
  }catch(e){
    console.warn('Snapshot load failed:', e);
  }
}

/* ======================= Q&A floating bubbles ========================= */
const MAX_QA_ONSCREEN = 1;
const QA_INTERVAL_MS  = 7500;
const qaLive = new Set();
const showing = new Set();
const answered = new Set();

setTimeout(scheduleNextQuestion, 2500);

function scheduleNextQuestion(){
  if (qaLive.size < MAX_QA_ONSCREEN) makeBubble();
  const jitter = 1200 + Math.random()*2200;
  setTimeout(scheduleNextQuestion, QA_INTERVAL_MS + jitter);
}

function pickQuestion(){
  const list = QUESTIONS.filter(q => !answered.has(q) && !showing.has(q));
  if (list.length === 0) return null;
  return list[Math.floor(Math.random()*list.length)];
}

function makeBubble(){
  const q = pickQuestion();
  if (!q) return;

  const el = document.createElement('div');
  el.className = 'qaBubble';
  el.innerHTML = `
    <p class="qaQuestion">${escapeHTML(q)}</p>
    <div class="qaRow">
      <input class="qaInput" type="text" maxlength="320" placeholder="type here..." />
      <button class="qaSend" type="button">Send</button>
    </div>
  `;
  document.body.appendChild(el);

  const padX = 24, padY = 24;
  const maxW = Math.min(560, window.innerWidth - 2*padX);
  el.style.maxWidth = maxW + 'px';
  const x = padX + Math.random()*(window.innerWidth - 2*padX - maxW);
  const y = padY + Math.random()*(window.innerHeight - 2*padY - 96);
  el.style.left = x + 'px';
  el.style.top  = y + 'px';

  requestAnimationFrame(()=> el.classList.add('show'));

  qaLive.add(el);
  showing.add(q);

  const input = el.querySelector('.qaInput');
  const send  = el.querySelector('.qaSend');
  let done = false;

  function submit(ev){
    if (ev) ev.preventDefault();
    if (done) return;
    done = true;

    const text = (input.value || '').trim();
    if (text){
      makeAnswerChip(x, y, text, q);
      answered.add(q);
    }
    send.disabled = true;
    input.removeEventListener('keydown', onKey);
    send.removeEventListener('click', onClick);
    closeBubble(el, q);
  }

  function onKey(ev){
    if (ev.isComposing) return;
    if (ev.key === 'Enter'){
      ev.preventDefault();
      ev.stopPropagation();
      submit(ev);
    }
  }
  function onClick(ev){ ev.preventDefault(); submit(ev); }

  input.addEventListener('keydown', onKey);
  send.addEventListener('click', onClick);
}

function closeBubble(el, qText){
  if (!el || !el.isConnected) return;
  el.classList.remove('show');
  setTimeout(()=>{
    el.remove();
    qaLive.delete(el);
    if (qText) showing.delete(qText);
  }, 250);
}

function makeAnswerChip(x, y, text, question){
  const chip = document.createElement('div');
  chip.className = 'answerChip';
  chip.textContent = text;

  const now = new Date();
  chip.dataset.question = question;
  chip.dataset.date = now.toLocaleDateString([], { year:'numeric', month:'short', day:'numeric' });
  chip.dataset.time = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });

  document.body.appendChild(chip);
  chip.style.left = (x + 8) + 'px';
  chip.style.top  = (y - 8) + 'px';

  const dx = (Math.random()*280 - 140).toFixed(0) + 'px';
  const dy = (Math.random()*-160 - 60).toFixed(0) + 'px';
  const rot = (Math.random()*16 - 8).toFixed(1) + 'deg';
  const dur = (6 + Math.random()*6).toFixed(1) + 's';

  chip.style.setProperty('--dx', dx);
  chip.style.setProperty('--dy', dy);
  chip.style.setProperty('--rot', rot);
  chip.style.setProperty('--dur', dur);

  chip.addEventListener('click', (ev)=>{
    ev.stopPropagation();
    const old = document.querySelector('.answerTooltip');
    if (old) old.remove();

    const tip = document.createElement('div');
    tip.className = 'answerTooltip';
    tip.innerHTML = `
      <div><strong>Question</strong></div>
      <div style="margin-top:6px; color:#fff;">${escapeHTML(chip.dataset.question)}</div>
      <div style="margin-top:8px; font-size:12px; color:#ccc;">${chip.dataset.date} • ${chip.dataset.time}</div>
    `;
    document.body.appendChild(tip);

    const r = chip.getBoundingClientRect();
    tip.style.left = '0px';
    tip.style.top  = '0px';

    requestAnimationFrame(()=>{
      const w = tip.offsetWidth, h = tip.offsetHeight;
      let left = r.left + r.width/2 - w/2;
      let top  = r.top - h - 10;
      left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
      top  = Math.max(8, top);
      tip.style.left = left + 'px';
      tip.style.top  = top  + 'px';
      requestAnimationFrame(()=> tip.classList.add('show'));
    });

    function close(e){
      if (!tip.contains(e.target) && e.target !== chip){
        tip.remove();
        window.removeEventListener('click', close);
      }
    }
    setTimeout(()=> window.addEventListener('click', close), 0);
  });
}








// window.addEventListener('load', () => {
//   const bgVideo = document.getElementById('bg-video');
//   bgVideo.playbackRate = 0.4;

//   const titleBtn = document.getElementById('titleBtn');
//   titleBtn.addEventListener('click', () => {
//     document.body.style.transition = 'opacity 0.6s ease';
//     document.body.style.opacity = 0;
//     setTimeout(() => {
//       window.location.href = 'experience.html';
//     }, 600);
//   });
// });





// 10월 29일 오후 6시 버전

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





// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
// import { WEBGL } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/capabilities/WebGL.js';

// console.log(THREE);

// if (WEBGL.isWebGLAvailable()) {

//   // 장면 
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x222222);
//   const axesHelper = new THREE.AxesHelper(5);
//   scene.add(axesHelper);

//   // 카메라
//   const camera = new THREE.PerspectiveCamera(
//     50, window.innerWidth / window.innerHeight, 1, 4000);
//   camera.position.set(0, 20 , 100);
//   camera.lookAt(0, 0, 0);

//   // // 캔버스
//   const canvas = document.querySelector('#space');
  
//   // 렌더러
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     // alpha: true,
//     antialias: true,
//   });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   // document.body.appendChild(renderer.domElement); // 원래 캔버스를 쓰므로 X

//   // 카메라 이후에 등장필요
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.minDistance = 20;
//   controls.maxDistance = 800;

//   const skyMaterialArray = []
//   const texture_ft = new THREE.TextureLoader().load('assets/haze_ft.jpg');
//   const texture_bk = new THREE.TextureLoader().load('assets/haze_bk.jpg');
//   const texture_up = new THREE.TextureLoader().load('assets/haze_up.jpg');
//   const texture_dn = new THREE.TextureLoader().load('assets/haze_dn.jpg');
//   const texture_rt = new THREE.TextureLoader().load('assets/haze_rt.jpg');
//   const texture_lf = new THREE.TextureLoader().load('assets/haze_lf.jpg');
  
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_ft,
//     }));
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_bk,
//     }));
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_up,
//     }));
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_dn,
//     }))
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_rt,
//     }));
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_lf,
//     }));
//   // 반복문
//   for (let i = 0; i < 6; i++) {
//     skyMaterialArray[i].side = THREE.BackSide;
//   }

//   // 매쉬
//   const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400);
//   const sky = new THREE.Mesh(skyGeometry, skyMaterialArray);
//   scene.add(sky);

//   // 빛
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
//   scene.add(ambientLight);

//   // Animation
//   function animate () {
//     requestAnimationFrame(animate);
//     sky.rotation.y += 0.002; // 회전 확인용
//     controls.update();
//     renderer.render(scene, camera);
//   }
//   animate();

//   // Resize
//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }
//   window.addEventListener('resize', onWindowResize, false);

// } else {
//   const el = document.createElement('div');
//   el.textContent = 'WebGL is not available on this device/browser.';
//   el.style.cssText = 'padding:12px;color:#fff;background:#c00;';
//   document.body.appendChild(el);
// }



// 오리지널임  (유튜브 참고해서 만든거라 남겨둠)
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
// import { OrbitControls } from './OrbitControls.js';

// console.log(THREE);

// if (WEBGL.isWebGLAvailable() === false) {
//   // 장면 
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x222222);

//   // 카메라
//   const camera = new THREE.PerspectiveCamera(
//     50, window.innerWidth / window.innerHeight, 1, 4000);
//   // camera.position.z = 2;
//   camera.position.set(0, 20 , 100);
//   // camera.lookAt(0, 0, 0);

//   // // 캔버스
//   const canvas = document.querySelector('#space');
  
//   // 렌더러
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     // alpha: true,
//     antialias: true,
//   });
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   // document.body.appendChild(renderer.domElement);

//   // 카메라 이후에 등장필요
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.minDistance = 20;
//   controls.maxDistance = 800;
//   controls.update();

//   const skyMaterialArray = []
//   const texture_ft = new THREE.TextureLoader().load('assets/haze_ft.jpg');
//   const texture_bk = new THREE.TextureLoader().load('assets/haze_bk.jpg');
//   const texture_up = new THREE.TextureLoader().load('assets/haze_up.jpg');
//   const texture_dn = new THREE.TextureLoader().load('assets/haze_dn.jpg');
//   const texture_rt = new THREE.TextureLoader().load('assets/haze_rt.jpg');
//   const texture_lf = new THREE.TextureLoader().load('../assets/haze_lf.jpg');
  
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_ft,
//     }));
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_bk,
//     }));
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_up,
//     }));
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_dn,
//     }))
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_rt,
//     }));
//   skyMaterialArray.push(
//     new THREE.MeshBasicMaterial({ 
//       map: texture_lf,
//     }));
//   // 반복문
//   for (let i = 0; i < 6; i++) {
//     skyMaterialArray[i].side = THREE.BackSide;
//   }

//   // 매쉬
//   const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400);
//   // const skyMaterial = new THREE.MeshStandardMaterial({
//   //   color: 0xffffff,
//   //   map: texture,
//   //   metalness: 0.1, 
//   //   roughness: 0.7,
//   // });
//   // skyMaterial.side = THREE.BackSide;
//   const sky = new THREE.Mesh(skyGeometry, skyMaterialArray);
//   scene.add(sky);

//   // 빛
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
//   scene.add(ambientLight);

//   // Animation
//   function animate () {
//     requestAnimationFrame(animate);
//     // controls.update();
//     renderer.render(scene, camera);
//   }
//   animate();

//   // Resize
//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }
//   window.addEventListener('resize', onWindowResize, false);

//   function render(time) {
//     time *= 0.001;  // convert time to seconds
  
//     sky.rotation.x = time;
//     sky.rotation.y = time;
  
//     renderer.render(scene, camera);
  
//     requestAnimationFrame(render);
//   }
//   requestAnimationFrame(render);
// }



// 초창기 큐브 만들기 (유튜브 참고해서 만든거라 남겨둠)
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// console.log(THREE);

//   // 장면 
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x004fff);

//   // 카메라
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   camera.position.z = 2;

//   // // 캔버스
//   const canvas = document.querySelector('#space');
  
//   // 렌더러
//   const renderer = new THREE.WebGLRenderer({canvas});
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   document.body.appendChild(renderer.domElement);

//   // 매쉬
//   const geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
//   const material = new THREE.MeshStandardMaterial({
//     color: 0x00ff00
//   });
//   const cube = new THREE.Mesh(geometry, material);
//   scene.add(cube);

//   function render(time) {
//     time *= 0.001;  // convert time to seconds
  
//     cube.rotation.x = time;
//     cube.rotation.y = time;
  
//     renderer.render(scene, camera);
  
//     requestAnimationFrame(render);
//   }
//   requestAnimationFrame(render);