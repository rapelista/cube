import {
    BoxGeometry,
    Camera,
    DirectionalLight,
    DirectionalLightHelper,
    GridHelper,
    Group,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    PointLightHelper,
    Scene,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons";

/**
 * Scene
 */
const scene = new Scene();

/**
 * Camera
 */
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
    canvas: document.querySelector(".webgl"),
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

/**
 * Object
 */
const boxAqua = new Group();
scene.add(boxAqua);

const geometry = new BoxGeometry(0.6, 0.6, 0.6);
const material = new MeshPhongMaterial({ color: "aqua" });
const mesh = new Mesh(geometry, material);
boxAqua.add(mesh);

/**
 * Light
 */
const lights = new Group();
boxAqua.add(lights);

const pointLightA = new PointLight("yellow", 0.2, 100);
pointLightA.position.set(1, 2, 1);
lights.add(pointLightA);
// lights.add(new PointLightHelper(pointLightA));

const pointLightB = new PointLight("salmon", 0.2, 100);
pointLightB.position.set(-1, -2, -1);
lights.add(pointLightB);
// lights.add(new PointLightHelper(pointLightB));

const pointLightC = new PointLight("salmon", 0.3, 100);
pointLightC.position.set(-1, 2, -1);
lights.add(pointLightC);
// lights.add(new PointLightHelper(pointLightC));

const pointLightD = new PointLight("lightblue", 0.15, 100);
pointLightD.position.set(1, -2, 1);
lights.add(pointLightD);
// lights.add(new PointLightHelper(pointLightD));

const pointLightE = new PointLight("skyblue", 0.1, 100);
pointLightE.position.set(-0.8, 0, 1.2);
lights.add(pointLightE);
// lights.add(new PointLightHelper(pointLightE));

const directionalLight = new DirectionalLight(0xffffff, 0.2);
directionalLight.position.y = 5;
lights.add(directionalLight);
// lights.add(new DirectionalLightHelper(directionalLight));

/**
 * Controls
 */
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 2;
controls.update();

// scene.add(new GridHelper(10, 10));

/**
 * Animation
 */
const animation = () => {
    requestAnimationFrame(animation);

    mesh.rotation.x += Math.PI * 0.002;
    mesh.rotation.y += Math.PI * 0.002;
    mesh.rotation.z += Math.PI * 0.002;

    lights.rotation.y += 0.001;

    controls.update();
    renderer.render(scene, camera);
};

const main = () => {
    animation();
};

main();
