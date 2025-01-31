 // This project was developed by @winlikesam (Telegram) 

import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Очень сильный рассеянный свет для общей освещенности
scene.add(new THREE.AmbientLight(0xffffff, 1));  // Сильно увеличена интенсивность

// Функция для добавления направленного света с экстремальной интенсивностью
const addDirectionalLight = (x, y, z, intensity) => {
  const light = new THREE.DirectionalLight(0xffffff, intensity);
  light.position.set(x, y, z);
  scene.add(light);
}

// Функция для добавления точечного света с экстремальной интенсивностью
const addPointLight = (x, y, z, intensity) => {
  const light = new THREE.PointLight(0xffffff, intensity, 1200);
  light.position.set(x, y, z);
  scene.add(light);
}

// Добавляем направленные и точечные света с очень высокой интенсивностью
addDirectionalLight(75, 75, 75, 10);
addDirectionalLight(-75, 75, 75, 10);
addPointLight(0, 75, 25, 8);
addPointLight(0, -75, 25, 8);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 100);
controls.update();

let coin = null;
const loader = new GLTFLoader();
loader.load('scene.gltf', function (gltf) {
	coin = gltf.scene;
	coin.scale.set(15, 15, 15);
	coin.position.y = 13;
	scene.add(coin);
	document.body.classList.remove('hidden');
	animate();
}, undefined, function (error) {
	console.error("An error occurred while loading the model", error);
});

let spinning = true;

function animate() {
	requestAnimationFrame(animate);
	if (spinning && coin) {
		coin.rotation.y += 0.03;
	}
	TWEEN.update();
	controls.update();
	renderer.render(scene, camera);
}

document.addEventListener("DOMContentLoaded", () => {
const flipButton = document.getElementById("flipButton");
const returnButton = document.getElementById("returnButton");
const flipSound = new Audio('flip.mp3');

flipButton.addEventListener("click", () => {
executeFlip();
});

flipButton.addEventListener("touchstart", (e) => {
e.preventDefault(); // Предотвратить стандартное поведение для touch (скроллинг и т.д.)
flipButton.classList.add("active");
});

flipButton.addEventListener("touchend", (e) => {
flipButton.classList.remove("active");
executeFlip(); // Вызов функции при завершении касания
});

returnButton.addEventListener("touchstart", (e) => {
e.preventDefault(); // Предотвратить стандартное поведение для touch (скроллинг и т.д.)
returnButton.classList.add("active");
});

returnButton.addEventListener("touchend", (e) => {
returnButton.classList.remove("active");
location.href = 'https://nickyylable.github.io/lasthere/'; // Вызов функции при завершении касания
});

function executeFlip() {
if (coin) {
	document.getElementById('pl-sound').play();
	document.getElementById("resultText").style.display = 'none';
	spinning = false;
	coin.rotation.set(0, 0, 0);

	const upAndDownTween = new TWEEN.Tween(coin.position)
		.to({ y: [50, 13] }, 2000)
		.easing(TWEEN.Easing.Quadratic.InOut);

	const rotationTween = new TWEEN.Tween(coin.rotation)
		.to({ y: coin.rotation.y + Math.PI * 10 }, 2000)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onComplete(() => {
			const result = Math.random() < 0.5 ? "Орел" : "Решка";
			const resultText = document.getElementById("resultText");
			resultText.textContent = result;
			resultText.style.display = 'block';
			resultText.style.left = result === "Орел" ? '34%' : '30%';
			resultText.classList.add("fadeInScaleUp");
		});

	setTimeout(() => {
		flipSound.play();
	}, 800);

	upAndDownTween.start();
	rotationTween.start();
}
}
});

window.addEventListener("resize", function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});
function showNotification() {
	document.getElementById('not-sound').play();
	const notification = document.getElementById('notification');
	notification.style.display = 'block'; // Сразу делаем элемент блочным, чтобы начать анимацию
	notification.style.top = '-10%'; // Начальное положение для анимации появления
	notification.style.opacity = '0'; // Начальная прозрачность

	// Плавное появление
	setTimeout(() => {
		notification.style.opacity = '1';
		notification.style.top = '10%';
	}, 10);

	// Планирование плавного исчезновения
	setTimeout(() => {
		hideNotification();
	}, 10000); // Отображаем уведомление в течение 10 секунд
}

function hideNotification() {
	document.getElementById('cl-sound').play();
	const notification = document.getElementById('notification');
	notification.style.opacity = '0';
	notification.style.top = '-10%';

	setTimeout(() => {
		notification.style.display = 'none';
	}, 1000); // Даем время на завершение анимации исчезновения
}

function startRandomNotification() {
	showNotification();
	setTimeout(startRandomNotification,  150000); // Следующее уведомление через 20 секунд
}

document.addEventListener('DOMContentLoaded', startRandomNotification);
document.addEventListener("DOMContentLoaded", function() {
var flipButton = document.getElementById("flipButton");

// Добавить класс 'active' при начале касания
flipButton.addEventListener("touchstart", function(e) {
	e.preventDefault(); // Предотвратить любое другое действие по умолчанию
	this.classList.add("active");
});

// Удалить класс 'active' при окончании касания
flipButton.addEventListener("touchend", function(e) {
	this.classList.remove("active");
});
});

 // This project was developed by @winlikesam (Telegram) 