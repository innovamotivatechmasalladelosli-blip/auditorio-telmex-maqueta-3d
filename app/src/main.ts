import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './styles.css';

type MaterialKey = 'concrete' | 'glass' | 'metal' | 'warm' | 'landscape';
type SceneKey = 'concert' | 'theatre' | 'open';

const materials: Record<MaterialKey, THREE.MeshStandardMaterial> = {
  concrete: new THREE.MeshStandardMaterial({ color: 0xb8b7ad, roughness: 0.82 }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0x7bc5d6, roughness: 0.12, metalness: 0.08, transmission: 0.25, transparent: true, opacity: 0.74 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x34414a, roughness: 0.34, metalness: 0.72 }),
  warm: new THREE.MeshStandardMaterial({ color: 0xc87946, roughness: 0.62 }),
  landscape: new THREE.MeshStandardMaterial({ color: 0x526c51, roughness: 0.95 })
};

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <header class="topbar">
    <div class="brand-mark">TMX</div>
    <div><p class="eyebrow">DISEÑADOR LOCAL · ANTEPROYECTO</p><h1>Estudio Telmex <span>3D</span></h1></div>
    <div class="top-meta"><span class="live-dot"></span>Escala 1:200 <b>·</b> Prototipo 0.1</div>
  </header>
  <main class="workspace">
    <aside class="sidebar left-panel">
      <section class="panel-section intro"><p class="eyebrow">CONTROL DE MAQUETA</p><h2>Construye la idea.</h2><p>Explora una volumetría editable del Auditorio Telmex y prueba materiales antes de fabricar.</p></section>
      <section class="panel-section"><div class="section-heading"><span>ESCENARIO</span><span class="chip">3 CONFIG.</span></div><div class="scene-buttons"><button data-scene="concert" class="scene-btn active"><strong>Concierto</strong><small>Plataforma adelantada</small></button><button data-scene="theatre" class="scene-btn"><strong>Teatro</strong><small>Escenario profundo</small></button><button data-scene="open" class="scene-btn"><strong>Platea abierta</strong><small>Acceso general</small></button></div></section>
      <section class="panel-section"><div class="section-heading"><span>CAPAS VISUALES</span></div><label class="switch-row"><span>Techo desmontable</span><input id="roofToggle" type="checkbox" checked><i></i></label><label class="switch-row"><span>Interior visible</span><input id="interiorToggle" type="checkbox" checked><i></i></label><label class="switch-row"><span>Entorno y plaza</span><input id="siteToggle" type="checkbox" checked><i></i></label></section>
      <section class="panel-section selected-panel"><div class="section-heading"><span>PIEZA SELECCIONADA</span><span id="selectionLabel" class="chip">NINGUNA</span></div><div id="objectDetails" class="object-details">Selecciona una pieza en la vista para cambiar su material.</div><div class="material-grid"><button data-material="concrete"><i class="swatch concrete"></i>Concreto</button><button data-material="glass"><i class="swatch glass"></i>Vidrio</button><button data-material="metal"><i class="swatch metal"></i>Metal</button><button data-material="warm"><i class="swatch warm"></i>Madera</button></div></section>
    </aside>
    <section class="viewport-shell"><div id="viewport"></div><div class="viewport-hud"><span class="hud-key">ARRASTRA</span> orbitar <span class="hud-separator">·</span><span class="hud-key">RUEDA</span> acercar <span class="hud-separator">·</span><span class="hud-key">CLIC</span> seleccionar</div><div class="north">N</div><div class="scale-ruler"><span>0</span><i></i><span>10 m</span></div></section>
    <aside class="sidebar right-panel"><section class="panel-section"><p class="eyebrow">FICHA DE PROYECTO</p><div class="metric"><span>Escenario</span><strong>33 × 24 m</strong></div><div class="metric"><span>Construcción</span><strong>31,000 m²</strong></div><div class="metric"><span>Base física</span><strong>120 × 90 cm</strong></div></section><section class="panel-section ai-panel"><div class="ai-orb">✦</div><p class="eyebrow">ASISTENTE LOCAL</p><h3>Variantes con IA</h3><p>Próximamente: conecta Ollama para convertir instrucciones en cambios revisables de Blender.</p><button class="outline-btn" id="copyPrompt">Copiar prompt de prueba</button></section><section class="panel-section legend"><div class="section-heading"><span>LEYENDA</span></div><p><i class="legend-dot verified"></i>Dato público verificado</p><p><i class="legend-dot estimate"></i>Geometría estimada</p><p><i class="legend-dot editable"></i>Pieza editable</p></section></aside>
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

const ground = addMesh('Entorno y plaza', new THREE.BoxGeometry(27, 0.35, 21), 'landscape', site, [0, -0.2, 0]);
const plaza = addMesh('Plaza de acceso', new THREE.BoxGeometry(17, 0.12, 7), 'concrete', site, [0, 0.06, 7]);
for (let i = -5; i <= 5; i += 2) addMesh(`Acceso ${i}`, new THREE.CylinderGeometry(0.16, 0.16, 0.9, 12), 'metal', site, [i, 0.5, 5.2]);
const base = addMesh('Volumen principal', new THREE.BoxGeometry(16, 5.5, 10.5), 'concrete', building, [0, 2.6, 0]);
const front = addMesh('Fachada de vidrio', new THREE.BoxGeometry(12.5, 3.0, 0.22), 'glass', building, [0, 2.05, 5.35]);
const canopy = addMesh('Marquesina principal', new THREE.BoxGeometry(13.4, 0.22, 3.1), 'metal', building, [0, 4.1, 6.35], [-0.12, 0, 0]);
const roofBody = addMesh('Techo desmontable', new THREE.CylinderGeometry(8.9, 8.4, 2.1, 48, 1, false, -Math.PI * 0.5, Math.PI), 'metal', roof, [0, 5.9, 0], [0, 0, Math.PI / 2]);
const hall = addMesh('Sala principal', new THREE.BoxGeometry(12.5, 1.2, 7.5), 'warm', interior, [0, 1.0, -0.3]);
const stage = addMesh('Escenario', new THREE.BoxGeometry(7.1, 0.35, 3.0), 'warm', interior, [0, 1.9, -3.6]);
const screen = addMesh('Pantalla', new THREE.BoxGeometry(6.6, 2.4, 0.12), 'glass', interior, [0, 3.2, -5.0]);
for (let row = 0; row < 5; row++) {
  const width = 10.5 - row * 0.65;
  addMesh(`Grada ${row + 1}`, new THREE.BoxGeometry(width, 0.28, 0.75), 'metal', interior, [0, 1.45 + row * 0.48, 1.8 + row * 0.82]);
}
const sideLeft = addMesh('Ala lateral izquierda', new THREE.BoxGeometry(2.0, 4.8, 8.8), 'concrete', building, [-8.2, 2.4, -0.2], [0, 0, -0.08]);
const sideRight = addMesh('Ala lateral derecha', new THREE.BoxGeometry(2.0, 4.8, 8.8), 'concrete', building, [8.2, 2.4, -0.2], [0, 0, 0.08]);

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
document.querySelector<HTMLButtonElement>('#copyPrompt')!.addEventListener('click', async e => { await navigator.clipboard?.writeText('Cambia la fachada de vidrio a concreto claro, conserva el techo desmontable y crea una variante de concierto a escala 1:200.'); (e.currentTarget as HTMLButtonElement).textContent = 'Prompt copiado'; setTimeout(() => (e.currentTarget as HTMLButtonElement).textContent = 'Copiar prompt de prueba', 1600); });
const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', event => { const rect = renderer.domElement.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1; raycaster.setFromCamera(pointer, camera); const hits = raycaster.intersectObjects(Object.values(editable), false); selectObject(hits[0]?.object ?? null); });
function resize() { const w = viewport.clientWidth, h = viewport.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); }
window.addEventListener('resize', resize); resize(); updateScene(sceneKey);
function animate() { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); }
animate();
