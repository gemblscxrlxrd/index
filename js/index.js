 // This project was developed by @winlikesam (Telegram) 
document.addEventListener('DOMContentLoaded', function() {
	let gamesButton = document.querySelector('.tablinks.games-icon');
	openTab(new Event('click'), 'Games', gamesButton);
	showSlides(slideIndex);
});

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("slide");
	var dots = document.getElementsByClassName("dot");
	var slidesContainer = document.querySelector(".slides");

	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slidesContainer.style.transform = `translateX(${-(slideIndex - 1) * 100 / slides.length}%)`;
	dots[slideIndex - 1].className += " active";
}

function openTab(evt, tabName, button) {
	var i, tabcontent, tablinks;
	var miniModal = document.getElementById('miniModal');
	var aboutGif = document.getElementById('aboutGif');

	// Скрываем все вкладки и удаляем класс 'active'
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
		tabcontent[i].classList.remove('active');
	}

	// Удаляем класс 'active' у всех кнопок
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove("active");
	}

	// Показываем текущую вкладку и добавляем класс 'active'
	document.getElementById(tabName).style.display = "flex";
	document.getElementById(tabName).classList.add('active');
	button.classList.add("active");

	// Скроллим страницу
	if (tabName === 'Games') {
		window.scrollTo({ top: 45, behavior: 'smooth' });
	} else {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}


	// Обрабатываем вкладку 'Contact'
	if (tabName === 'Contact') {
		miniModal.style.display = 'none';
	}
}


const typingText = document.querySelector('.typing-text');
const phrases = [
	"Подпишись на канал",
	"Не упускай раздачи",
	"Лови ваучеры!"
];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = [];
let isDeleting = false;
let delay = 60;

function type() {
	if (isDeleting && currentPhrase.length === 0) {
		phraseIndex = (phraseIndex + 1) % phrases.length;
		letterIndex = 0;
		isDeleting = false;
		if (phraseIndex === 0) {
			setTimeout(type, 2000);
			return;
		}
	} else if (!isDeleting && currentPhrase.length === phrases[phraseIndex].length) {
		isDeleting = true;
		delay = 2500;
	}

	if (isDeleting) {
		currentPhrase.pop();
		delay = 30;
	} else {
		currentPhrase.push(phrases[phraseIndex][letterIndex++]);
		delay = 120;
	}

	typingText.textContent = currentPhrase.join('');
	typingText.style.opacity = isDeleting ? 0.5 : 1;
	setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(type, 2000);
});
	$(document).ready(function () {
	for (i = 0; i < 5; i++) {
		$(".list li").clone().appendTo(".list");
	}
	$('.button').click(function () {
		$('.window').css({
			right: "0"
		});
		$('.list li').css({
			border: '4px solid transparent'
		});
		function selfRandom(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		var x = selfRandom(50, 100);
		$('.list li:eq('+x+')').css({
			border: '4px solid #00ba00'
		});

		var itemWidth = 100;
		var itemMargin = 8;
		$('.window').animate({
			right: ((x * itemWidth) + (x * itemMargin) - 119)
		}, 10000);
	});
});
function detectDevice() {
	var ua = navigator.userAgent;
	var deviceType;
	var deviceModel = "";

	if (/android/i.test(ua)) {
		deviceType = "Android";
		var match = ua.match(/Android.*?; (\w+)\s(\w+)\s/);
		deviceModel = match ? match[1] + " " + match[2] : "";
	} else if (/iPhone|iPad|iPod/i.test(ua)) {
		deviceType = "iOS";
		if (/iPhone/i.test(ua)) {
			deviceModel = "iPhone";
		} else if (/iPad/i.test(ua)) {
			deviceModel = "iPad";
		} else if (/iPod/i.test(ua)) {
			deviceModel = "iPod";
		}
	} else {
		deviceType = "Desktop";
	}

	var output = deviceModel ? deviceType + " (" + deviceModel + ")" : deviceType;
	var deviceOutput = document.getElementById("device-output");
	deviceOutput.classList.remove("visible");
	setTimeout(function() {
		deviceOutput.textContent = output;
		deviceOutput.classList.add("visible");
	}, 10);
}
 function startGame() {
	console.log(document.getElementById("device-output").textContent);
	if (document.getElementById("device-output").textContent.trim() === "Устройство не определено") {
		showModal();
	} else {
		const now = new Date().getTime();
		const lastGameTime = localStorage.getItem('lastGameTime');
					 if (lastGameTime && now - lastGameTime < 600000) {
			showMiniModal();
			return;
		}
		var randomNumber = Math.floor(Math.random() * 4) + 1;
		var probability = Math.floor(Math.random() * 12) + 85;
		localStorage.setItem('lastGameTime', now);
		localStorage.setItem('lastGameImage', randomNumber);
		localStorage.setItem('lastProbability', probability);

		var imgContainer = document.querySelector('.image-container');
		var oldImage = imgContainer.querySelector('img');
		oldImage.style.display = 'none';

		var loaderDiv = document.createElement('div');
		loaderDiv.className = 'loader';
		imgContainer.appendChild(loaderDiv);

		setTimeout(function() {
			loaderDiv.remove();
			oldImage.style.display = 'block';
			oldImage.src = 'assets/index/' + randomNumber + '.JPG';
			oldImage.style.marginLeft = "25px";
		}, 3000);
	}
}

function showMiniModal() {
	const lastGameImage = localStorage.getItem('lastGameImage');
	const gameName = getGameName(lastGameImage);
	const probability = localStorage.getItem('lastProbability');
	const remainingTime = 600 - Math.floor((new Date().getTime() - localStorage.getItem('lastGameTime')) / 1000);

	const modalContent = `
		<div style="
			background-color: #fff;
			border-radius: 10px;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
			padding: 20px;
			max-width: 290px;
			margin: 100px auto 0;
			text-align: center;
			font-family: 'Intro', Arial, sans-serif;">
			<h2 style="
				color: #333;
				font-size: 24px;">Внимание!</h2>
			<p style="
				font-size: 16px;
				color: #666;
				line-height: 1.5;
				margin-top: 10px;">Наша команда заботится о точности выданной вам игры, в режиме реального времени. В ближайшие 600 секунд, для вашего устройства с вероятностью ${probability}% будут работать сигналы на игру ${gameName}. Следующий запрос можно отправить через ${remainingTime} секунд.</p>
			<p style="
				font-size: 16px;
				color: #666;
				margin-bottom: 20px;">С уважением, команда бота по сигналам!</p>
			<button onclick="closeMiniModal()" style="
				background: linear-gradient(to right, #2196F3, #21CBF3);
				color: white;
				padding: 10px 20px;
				border: none;
				border-radius: 5px;
				cursor: pointer;
				font-size: 16px;
				transition: all 0.3s ease-out;
				outline: none;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
				font-family: 'Intro', Arial, sans-serif;">Закрыть</button>
		</div>
	`;

	var miniModal = document.getElementById('miniModal');
	miniModal.innerHTML = modalContent;
	miniModal.style.display = 'block';
}

function getGameName(imageNumber) {
	switch (imageNumber) {
		case '1':
			return 'Mines';
		case '2':
			return 'Royal Mines';
		case '3':
			return 'Coin Flip';
		case '4':
			return 'Brawl Pirates';
		default:
			return '';
	}
}

function closeMiniModal() {
	var miniModal = document.getElementById('miniModal');
	miniModal.style.display = 'none';
}


function showModal() {
	var modal = document.getElementById("modal");
	modal.style.display = 'block';
	requestAnimationFrame(() => {
		modal.classList.add("show");
	});
}

function closeModal() {
	var modal = document.getElementById("modal");
	modal.classList.remove("show");
	setTimeout(() => {
		modal.style.display = 'none';
	}, 500); // 500ms - время вашей CSS transition
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}
function openGame(game) {
	var ua = navigator.userAgent;
	var isIOS = /iPhone|iPad|iPod/i.test(ua);

	var links = {
		mines: {
			ios: 'miny.html',
			other: 'miny.html'
		},
		royalMines: {
			ios: 'royal.html',
			other: 'royal.html'

		},
		coinFlip: {
			ios: 'coinflip.html',
			other: 'coinflip.html'
		},
		brawlPirates: {
			ios: 'pirates.html',
			other: 'pirates.html'
		},
		bomBucks: {
			ios: 'bombucks.html',
			other: 'bombucks.html'
		},
		luckyJet: {
			ios: 'lucky.html',
			other: 'lucky.html'
		}
	};

	var url = isIOS ? links[game].ios : links[game].other;
	window.location.href = url;
}


 // This project was developed by @winlikesam (Telegram) 