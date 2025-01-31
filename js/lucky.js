 // This project was developed by @winlikesam (Telegram) 
let interval = null;
function getRandomTarget() {
	const rand = Math.random();
	if (rand < 0.5) {
		// 50% chance for range 0.00 - 5.00
		return (Math.random() * 5.00).toFixed(2);
	} else if (rand < 0.75) {
		// 25% chance for range 5.00 - 10.00
		return (5.00 + Math.random() * 5.00).toFixed(2);
	} else if (rand < 0.9) {
		// 15% chance for range 10.00 - 15.00
		return (10.00 + Math.random() * 5.00).toFixed(2);
	} else {
		// 10% chance for range 15.00 - 19.99
		return (15.00 + Math.random() * 4.99).toFixed(2);
	}
}

function startCounter() {
	clearInterval(interval);
	let counterNumber = document.getElementById('counter');
	let target = getRandomTarget();
	let current = 0.01;
	counterNumber.textContent = current.toFixed(2);

	interval = setInterval(function() {
		let increment = (target - current) / 100 + 0.01;
		current += increment;
		if (current >= target) {
			clearInterval(interval);
			current = target;
		}
		counterNumber.textContent = current.toFixed(2);
	}, 20);
}
 // This project was developed by @winlikesam (Telegram) 