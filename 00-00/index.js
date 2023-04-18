// 引入threejs
import * as THREE from 'three';
console.log(THREE);
// 引入相机控件
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 生成虚拟场景
const scene = new THREE.Scene();

// 长方体
const geometry = new THREE.BoxGeometry(100, 100, 100);

// 材料
// 不受光源影响
// const material = new THREE.MeshBasicMaterial({
//     color: 0xFF6700,
//     transparent: true,
//     opacity: .6
// })
// 受光源影响
const material = new THREE.MeshLambertMaterial({
    color: 0xFF6700
});

// 网格模型
const mesh = new THREE.Mesh(geometry, material);
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(50, 50, 50);
// 添加到场景中
scene.add(mesh);

const width = 1000;
const height = 800;
// 生成虚拟相机
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const carema = new THREE.PerspectiveCamera(45, width / height, 1, 3000);

// 相机所在位置
carema.position.set(400, 400, 400);
// 相机观察的位置
carema.lookAt(0, 0, 0);

// x, y, z轴 辅助线
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);

// 生成一个光源(接收两个参数: 光源颜色, 光源强度)
const pointLight = new THREE.PointLight(0xFF45CC, 1.0);
pointLight.position.set(180, 180, 180)
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight, 50, 0xFFFF00)
scene.add(lightHelper)

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
// 渲染场景和相机
renderer.render(scene, carema);

const domElement = renderer.domElement;
document.body.appendChild(domElement);

const orbitControls = new OrbitControls(carema, domElement);
orbitControls.addEventListener('change', function() {
    console.log(this);
    renderer.render(scene, carema);
});

