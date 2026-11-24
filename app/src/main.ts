import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './styles.css';

type MaterialKey = 'concrete' | 'glass' | 'metal' | 'warm' | 'landscape';
type SceneKey = 'concert' | 'theatre' | 'open';

function createConcreteTexture() {
  const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d')!; ctx.fillStyle = '#aaa9a0'; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 1800; i++) { const shade = 135 + Math.floor(Math.random() * 45); ctx.fillStyle = `rgba(${shade},${shade},${shade - 3},${0.08 + Math.random() * 0.14})`; ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 3, 1 + Math.random() * 3); }
  const texture = new THREE.CanvasTexture(canvas); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(3, 3); return texture;
}
function createPavingTexture() {
  const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 256; const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#766f66'; ctx.fillRect(0, 0, 256, 256); ctx.strokeStyle = 'rgba(220,210,190,.28)'; ctx.lineWidth = 2;
  for (let n = 0; n <= 256; n += 24) { ctx.beginPath(); ctx.moveTo(n, 0); ctx.lineTo(n, 256); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, n); ctx.lineTo(256, n); ctx.stroke(); }
  const texture = new THREE.CanvasTexture(canvas); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(6, 5); return texture;
}
const materials: Record<MaterialKey, THREE.MeshStandardMaterial> = {
  concrete: new THREE.MeshStandardMaterial({ color: 0xb8b7ad, roughness: 0.9, map: createConcreteTexture() }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0x76c5d3, roughness: 0.08, metalness: 0.12, transmission: 0.2, transparent: true, opacity: 0.68 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x34414a, roughness: 0.3, metalness: 0.8 }),
  warm: new THREE.MeshStandardMaterial({ color: 0xc87946, roughness: 0.62 }),
  landscape: new THREE.MeshStandardMaterial({ color: 0x526c51, roughness: 0.95, map: createPavingTexture() })
};

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <header class="topbar">
    <div class="brand-mark">TMX</div>
    <div><p class="eyebrow">MAQUETA ESCOLAR · PROTOTIPO 0.3</p><h1>Estudio Telmex <span>3D</span></h1></div>
    <div class="top-meta"><span class="live-dot"></span>Escala 1:200 <b>·</b> Modelo + guía escolar</div>
  </header>
  <main class="workspace">
    <aside class="sidebar left-panel">
      <section class="panel-section intro"><p class="eyebrow">CONTROL DE MAQUETA</p><h2>Construye la idea.</h2><p>Explora una volumetría editable del Auditorio Telmex y prueba materiales antes de fabricar.</p></section>
      <section class="panel-section"><div class="section-heading"><span>ESCENARIO</span><span class="chip">3 CONFIG.</span></div><div class="scene-buttons"><button data-scene="concert" class="scene-btn active"><strong>Concierto</strong><small>Plataforma adelantada</small></button><button data-scene="theatre" class="scene-btn"><strong>Teatro</strong><small>Escenario profundo</small></button><button data-scene="open" class="scene-btn"><strong>Platea abierta</strong><small>Acceso general</small></button></div></section>
      <section class="panel-section"><div class="section-heading"><span>CAPAS VISUALES</span></div><label class="switch-row"><span>Techo desmontable</span><input id="roofToggle" type="checkbox" checked><i></i></label><label class="switch-row"><span>Interior visible</span><input id="interiorToggle" type="checkbox" checked><i></i></label><label class="switch-row"><span>Entorno y plaza</span><input id="siteToggle" type="checkbox" checked><i></i></label></section>
      <section class="panel-section selected-panel"><div class="section-heading"><span>PIEZA SELECCIONADA</span><span id="selectionLabel" class="chip">NINGUNA</span></div><div id="objectDetails" class="object-details">Selecciona una pieza en la vista para cambiar su material.</div><div class="material-grid"><button data-material="concrete"><i class="swatch concrete"></i>Cartón gris</button><button data-material="glass"><i class="swatch glass"></i>Acetato</button><button data-material="metal"><i class="swatch metal"></i>Cartulina negra</button><button data-material="warm"><i class="swatch warm"></i>Papel madera</button></div></section>
    </aside>
    <section class="viewport-shell"><div id="viewport"></div></section>
    <aside class="sidebar right-panel"><section class="panel-section"><p class="eyebrow">FICHA DE PROYECTO</p><div class="metric"><span>Escenario</span><strong>33 × 24 m</strong></div><div class="metric"><span>Construcción</span><strong>31,000 m²</strong></div><div class="metric"><span>Base escolar</span><strong>80 × 60 cm</strong></div></section><section class="panel-section guide-panel"><p class="eyebrow">GUÍA DE FABRICACIÓN</p><h3>Hazlo con materiales escolares.</h3><p>La maqueta está pensada para una base de 80 × 60 cm y un presupuesto máximo aproximado de $900 MXN.</p><div class="budget-total"><span>Presupuesto objetivo</span><strong>$784 MXN</strong></div><a class="outline-btn primary-ai" href="./guia-maqueta.html" target="_blank" rel="noreferrer">Abrir guía completa</a><p class="guide-note">Incluye lista de compras, medidas, pasos, referencias e imágenes conceptuales.</p></section><section class="panel-section visual-panel"><p class="eyebrow">REFERENCIAS VISUALES</p><div class="thumbs"><a href="./imagenes/maqueta-exterior.png" target="_blank"><img src="./imagenes/maqueta-exterior.png" alt="Vista exterior conceptual"></a><a href="./imagenes/maqueta-desmontable.png" target="_blank"><img src="./imagenes/maqueta-desmontable.png" alt="Vista desmontable conceptual"></a></div><a class="text-btn guide-link" href="./guia-maqueta.html" target="_blank">Ver documento con imágenes →</a></section><section class="panel-section legend"><div class="section-heading"><span>LEYENDA</span></div><p><i class="legend-dot verified"></i>Dato público verificado</p><p><i class="legend-dot estimate"></i>Geometría estimada</p><p><i class="legend-dot editable"></i>Pieza editable</p></section></aside>
  </main>
`;

const viewport = document.querySelector<HTMLDivElement>('#viewport')!;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10151a);
scene.fog = new THREE.Fog(0x10151a, 30, 70);
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
camera.position.set(19, 15, 22);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
viewport.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 10;
controls.maxDistance = 44;

scene.add(new THREE.HemisphereLight(0xa9c9d6, 0x1b2224, 2.1));
const keyLight = new THREE.DirectionalLight(0xffe5c0, 3.2);
keyLight.position.set(-12, 24, 14); keyLight.castShadow = true; scene.add(keyLight);
const fillLight = new THREE.PointLight(0x74c4d5, 18, 30); fillLight.position.set(2, 7, 2); scene.add(fillLight);

const editable: Record<string, THREE.Object3D> = {};
const model = new THREE.Group(); model.rotation.y = -0.18; scene.add(model);
const site = new THREE.Group(); model.add(site);
const building = new THREE.Group(); model.add(building);
const interior = new THREE.Group(); building.add(interior);
const roof = new THREE.Group(); building.add(roof);
let selected: THREE.Object3D | null = null;
let sceneKey: SceneKey = 'concert';
let roofVisible = true;

function addMesh(name: string, geometry: THREE.BufferGeometry, material: MaterialKey, parent: THREE.Object3D, position: [number, number, number], rotation?: [number, number, number]) {
  const mesh = new THREE.Mesh(geometry, materials[material]);
  mesh.name = name; mesh.position.set(...position); if (rotation) mesh.rotation.set(...rotation);
  mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); editable[name] = mesh; return mesh;
}

const ground = addMesh('Entorno y plaza', new THREE.BoxGeometry(29, 0.35, 23), 'landscape', site, [0, -0.2, 0]);
const plaza = addMesh('Explanada de acceso', new THREE.BoxGeometry(21, 0.14, 7.2), 'concrete', site, [0, 0.08, 8.2]);
const darkPlinth = addMesh('Plinto oscuro', new THREE.CylinderGeometry(1, 1, 1.1, 64), 'metal', building, [0, 0.48, 0]); darkPlinth.scale.set(10.5, 1, 6.25);
const body = addMesh('Volumen oval principal', new THREE.CylinderGeometry(1, 1, 5.1, 64), 'concrete', building, [0, 3.0, 0]); body.scale.set(10.1, 1, 6.0);
const lowerBand = addMesh('Banda de acceso', new THREE.CylinderGeometry(1, 1, 1.25, 64), 'metal', building, [0, 1.35, 0]); lowerBand.scale.set(10.25, 1, 6.1);
const lobby = addMesh('Vestíbulo curvo acristalado', new THREE.CylinderGeometry(8.65, 8.65, 2.45, 64, 1, true, -0.78, 1.56), 'glass', building, [0, 2.25, 4.4]); lobby.scale.z = 0.62;
const lobbyRoof = addMesh('Alero del vestíbulo', new THREE.CylinderGeometry(8.9, 8.9, 0.22, 64, 1, true, -0.78, 1.56), 'metal', building, [0, 3.63, 4.4]); lobbyRoof.scale.z = 0.64;
const roofShell = addMesh('Gran cubierta ovalada', new THREE.SphereGeometry(1, 64, 24, 0, Math.PI * 2, 0, Math.PI * 0.52), 'metal', roof, [0, 6.15, -0.15]); roofShell.scale.set(11.9, 4.5, 7.15);
const roofRim = addMesh('Borde de cubierta', new THREE.TorusGeometry(1, 0.11, 10, 96), 'metal', roof, [0, 5.5, -0.15], [Math.PI / 2, 0, 0]); roofRim.scale.set(11.45, 6.8, 1);
for (let side of [-1, 1]) for (let i = 0; i < 13; i++) {
  const z = -4.9 + i * 0.82; const x = side * (8.15 + Math.sin((i / 12) * Math.PI) * 0.55);
  const rib = addMesh(`Muro nervurado ${side === -1 ? 'izq' : 'der'} ${i + 1}`, new THREE.BoxGeometry(0.22, 4.55 + Math.sin((i / 12) * Math.PI) * 0.75, 0.34), 'concrete', building, [x, 2.65, z]); rib.rotation.z = side * 0.08;
}
for (let i = -5; i <= 5; i += 2) addMesh(`Bolardo acceso ${i}`, new THREE.CylinderGeometry(0.12, 0.12, 0.75, 12), 'metal', site, [i, 0.46, 5.2]);
for (let i = -8; i <= 8; i += 2) { const line = addMesh(`Junta plaza ${i}`, new THREE.BoxGeometry(0.025, 0.02, 6.3), 'metal', site, [i, 0.17, 8.2]); (line.material as THREE.MeshStandardMaterial).color.set(0x2a2927); }

const hall = addMesh('Sala principal', new THREE.CylinderGeometry(1, 1, 0.8, 64), 'warm', interior, [0, 1.25, -0.65]); hall.scale.set(6.5, 1, 4.65);
const stage = addMesh('Escenario móvil', new THREE.BoxGeometry(7.0, 0.32, 2.85), 'warm', interior, [0, 1.8, -4.05]);
const stageFrame = addMesh('Marco escénico', new THREE.BoxGeometry(7.6, 2.7, 0.18), 'metal', interior, [0, 3.2, -5.3]);
const screen = addMesh('Pantalla de escenario', new THREE.BoxGeometry(6.55, 2.15, 0.08), 'glass', interior, [0, 3.25, -5.42]);
for (let row = 0; row < 10; row++) {
  const radiusX = 4.0 + row * 0.62; const radiusZ = 2.6 + row * 0.52; const angleSpan = Math.PI * 0.72;
  for (let seat = 0; seat < 17; seat++) { const a = Math.PI / 2 - angleSpan / 2 + (seat / 16) * angleSpan; const x = Math.cos(a) * radiusX; const z = Math.sin(a) * radiusZ + 0.65; const bench = addMesh(`Butacas ${row + 1}-${seat + 1}`, new THREE.BoxGeometry(0.28, 0.18, 0.34), 'metal', interior, [x, 1.55 + row * 0.28, z]); bench.rotation.y = -a + Math.PI / 2; }
}
for (let i = 0; i < 9; i++) { const ring = addMesh(`Barandal balcón ${i + 1}`, new THREE.TorusGeometry(4.1 + i * 0.55, 0.035, 6, 64, Math.PI * 0.7), 'metal', interior, [0, 2.0 + i * 0.28, 0.65], [Math.PI / 2, 0, Math.PI / 2]); ring.scale.z = 0.7; }

function setMaterial(key: MaterialKey) { if (selected && 'material' in selected) (selected as THREE.Mesh).material = materials[key]; }
function updateScene(next: SceneKey) {
  sceneKey = next;
  const configs: Record<SceneKey, { z: number; h: number; label: string }> = { concert: { z: -3.6, h: 0.35, label: 'PLATAFORMA ADELANTADA' }, theatre: { z: -4.2, h: 0.6, label: 'ESCENARIO PROFUNDO' }, open: { z: -2.7, h: 0.18, label: 'PLATEA ABIERTA' } };
  stage.position.z = configs[next].z; stage.scale.y = configs[next].h / 0.35; screen.visible = next !== 'open';
  document.querySelectorAll('.scene-btn').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-scene') === next));
  document.querySelector('#objectDetails')!.textContent = `Configuración activa: ${configs[next].label}. Selecciona una pieza para editar su material.`;
}
function selectObject(object: THREE.Object3D | null) {
  selected = object && object.name in editable ? object : null;
  document.querySelector('#selectionLabel')!.textContent = selected ? selected.name.toUpperCase() : 'NINGUNA';
  document.querySelector('#objectDetails')!.textContent = selected ? `Pieza editable · ${selected.name}. El cambio se aplica solo a esta sesión.` : 'Selecciona una pieza en la vista para cambiar su material.';
}

document.querySelectorAll<HTMLButtonElement>('.scene-btn').forEach(btn => btn.addEventListener('click', () => updateScene(btn.dataset.scene as SceneKey)));
document.querySelectorAll<HTMLButtonElement>('[data-material]').forEach(btn => btn.addEventListener('click', () => setMaterial(btn.dataset.material as MaterialKey)));
document.querySelector<HTMLInputElement>('#roofToggle')!.addEventListener('change', e => { roofVisible = (e.target as HTMLInputElement).checked; roof.visible = roofVisible; });
document.querySelector<HTMLInputElement>('#interiorToggle')!.addEventListener('change', e => { interior.visible = (e.target as HTMLInputElement).checked; });
document.querySelector<HTMLInputElement>('#siteToggle')!.addEventListener('change', e => { site.visible = (e.target as HTMLInputElement).checked; });
const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', event => { const rect = renderer.domElement.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1; raycaster.setFromCamera(pointer, camera); const hits = raycaster.intersectObjects(Object.values(editable), false); selectObject(hits[0]?.object ?? null); });
function resize() { const w = viewport.clientWidth, h = viewport.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); }
window.addEventListener('resize', resize); resize(); updateScene(sceneKey);
function animate() { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); }
animate();
