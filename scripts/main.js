import {
    BoxGeometry,
    DirectionalLight,
    Group,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer,
    Color,
    TorusGeometry,
    GridHelper,
    DirectionalLightHelper,
    PointLightHelper,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons";

/**
 * Scene
 */
const scene = new Scene();
scene.background = new Color(0x080212);
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

const torusGroup = new Group();
torusGroup.position.y = -0.2;
scene.add(torusGroup);

const torusGeometry = new TorusGeometry(2, 1, 64, 32);
const torusMaterial = new MeshPhongMaterial({ color: "aqua", wireframe: true });
const torusMesh = new Mesh(torusGeometry, torusMaterial);
torusGroup.add(torusMesh);

const torusPointLightA = new PointLight("aqua", 0.01);
torusGroup.add(torusPointLightA);
// scene.add(new PointLightHelper(torusPointLightA));

/**
 * Light
 */
const lights = new Group();
boxAqua.add(lights);

const pointLightA = new PointLight("yellow", 0.1, 3);
pointLightA.position.set(1, 2, 1);
lights.add(pointLightA);
// lights.add(new PointLightHelper(pointLightA));

const pointLightB = new PointLight("salmon", 0.1, 3);
pointLightB.position.set(-1, -2, -1);
lights.add(pointLightB);
// lights.add(new PointLightHelper(pointLightB));

const pointLightC = new PointLight("salmon", 0.3, 3);
pointLightC.position.set(-1, 2, -1);
lights.add(pointLightC);
// lights.add(new PointLightHelper(pointLightC));

const pointLightD = new PointLight("lightblue", 0.15, 3);
pointLightD.position.set(1, -2, 1);
lights.add(pointLightD);
// lights.add(new PointLightHelper(pointLightD));

const pointLightE = new PointLight("skyblue", 0.1, 3);
pointLightE.position.set(-0.8, 0, 1.2);
lights.add(pointLightE);
// lights.add(new PointLightHelper(pointLightE));

const directionalLight = new DirectionalLight(0xffffff);
directionalLight.position.z = 5;
directionalLight.position.y = 0;
scene.add(directionalLight);
// scene.add(new DirectionalLightHelper(directionalLight));

/**
 * Controls
 */
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.y = Math.PI - 0.5;
controls.update();

/**
 * Animation
 */

let rotate = () => {
    return Math.PI * 0.002;
};

const animation = () => {
    const now = new Date().getTime();
    requestAnimationFrame(animation);

    mesh.rotation.x += rotate(now);
    mesh.rotation.y += rotate(now);
    mesh.rotation.z += rotate(now);

    lights.rotation.y += 0.001;

    directionalLight.intensity = Math.sin(now * 0.0012) * 0.0001;

    torusMesh.rotation.x += Math.cos(now * 0.002) * 0.001;
    torusMesh.rotation.z -= 0.002;
    torusPointLightA.intensity += Math.cos(now * 0.001) * 0.002;

    controls.update();
    renderer.render(scene, camera);
};

const main = () => {
    animation();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.querySelectorAll("nav a").forEach((link) => {
        link.addEventListener("click", () => {
            const now = new Date().getTime();

            rotate = (date) => {
                const { scale } = mesh;

                if (scale.x <= 0) {
                    /**
                     * Change Page Here
                     */

                    return;
                } else {
                    scale.x -= 0.002;
                    scale.y -= 0.002;
                    scale.z -= 0.002;

                    const time = new Date().getTime();
                    const x = Math.floor((time - now) * 0.001) + 2;
                    return x ** 3 * Math.PI * 0.002;
                }
            };
        });
    });
};

main();
