 // This project was developed by @winlikesam (Telegram) 
// Прослушивание сообщений от внедренного iframe или других источников
window.addEventListener('message', function(event) {
	const receivedNumber = event.data;
	if (receivedNumber && !isNaN(receivedNumber)) {
		count = parseInt(receivedNumber, 10);
		closeModal(); // Используем функцию для плавного скрытия модального окна
		setTimeout(getSignal, 500); // Запускаем функцию получения сигнала с новым количеством ловушек
	}
});

let count = 3; // Начальное количество ловушек
const countElement = document.getElementById('count');
const modal = document.getElementById('modal');
const modalInput = document.getElementById('modal-count');
const soundEffect = document.getElementById('sound-effect');

// Функция для создания квадратов в сетке
function createSquares() {
	const grid = document.getElementById('grid');
	for (let i = 0; i < 25; i++) {
		const square = document.createElement('div');
		square.className = 'square';
		grid.appendChild(square);
	}
}

function resetGrid() {
	const grid = document.getElementById('grid');
	grid.innerHTML = ''; // Очистка текущих квадратов
	createSquares(); // Создание новых квадратов
}

// Функции для показа и скрытия модального окна
function showModal() {
	document.getElementById('ok-sound').play();
	resetGrid(); // Очистка и пересоздание сетки перед каждым показом
	modal.style.display = 'flex'; // Убедитесь, что модальное окно видимо
	modal.classList.add('show');
}

function closeModal() {
	document.getElementById('close-sound').play();
	modal.classList.remove('show');
	setTimeout(() => {
		modal.style.display = 'none';
	}, 500); // Совпадает с длительностью CSS-транзиции для opacity и visibility
}


// Функция для получения сигнала и отображения изменений в квадратах
function getSignal() {
const squares = document.querySelectorAll('.square');
squares.forEach(square => {
	square.style.backgroundColor = '#238fa9';
	square.innerHTML = ''; // Удаление всех дочерних элементов (звезд)
});

let indices = new Set();
const cellsToOpen = squaresToOpen(); // Определяем, сколько ячеек открыть

while (indices.size < cellsToOpen) {
	indices.add(Math.floor(Math.random() * squares.length));
}

let delay = 0;
indices.forEach(index => {
	setTimeout(() => {
		const audio = new Audio('assets/audio/star.mp3');
		audio.play();
		const square = squares[index];
		square.style.backgroundColor = '#0a101e';
		const starDiv = document.createElement('div');
		starDiv.style = "width: 100%; height: 100%; background: url('assets/star.svg') center/contain no-repeat;";
		starDiv.className = 'star';
		square.appendChild(starDiv);
		setTimeout(() => {
			starDiv.classList.add('visible');
		}, 100); // Задержка перед появлением звезды
	}, delay);
	delay += 1000;
});
 countElement.textContent = ""; // Очистка текста с количеством ловушек после завершения действия
}


// Определение количества ячеек для открытия в зависимости от количества ловушек
function squaresToOpen() {
	switch (count) {
		case 1:
			return 10; // Если выбрана 1 ловушка, открываем 10 ячеек
		case 3:
			return 5;  // Если выбрано 3 ловушки, открываем 5 ячеек
		case 5:
			return 4;  // Если выбрано 5 ловушек, открываем 4 ячейки
		case 7:
			return 3;  // Если выбрано 7 ловушек, открываем 3 ячейки
		default:
			return 3;  // Значение по умолчанию
	}
}
 // This project was developed by @winlikesam (Telegram) 