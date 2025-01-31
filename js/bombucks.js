 // This project was developed by @winlikesam (Telegram) 

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const playButton = document.querySelector('#play');
    const resetButton = document.querySelector('#reset');
    const fieldSelect = document.getElementById('fieldSelect');
    let dotsCount = 0;
    let numRows = 5;
    let numCols = 6;
    let maxDots = 15;
    let squareSize = 52;

    function initializeBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < numRows; i++) {
            const newRow = document.createElement('div');
            newRow.className = 'row';
            for (let j = 0; j < numCols; j++) {
                const newSquare = document.createElement('div');
                newSquare.className = 'square';
                newSquare.style.width = `${squareSize}px`;
                newSquare.style.height = `${squareSize}px`;

                const neonCircle = document.createElement('div');
                neonCircle.className = 'neon-circle';
                newSquare.appendChild(neonCircle);

                newRow.appendChild(newSquare);
            }
            gameBoard.appendChild(newRow);
        }
        updateSelectAndButtonWidth();
    }
    function triggerHapticFeedback() {
            if (window.Telegram && window.Telegram.WebApp.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
            }
        }

    function updateBoardSize() {
        triggerHapticFeedback();
        const rowWidth = squareSize * numCols + (numCols - 1) * 2.7;
        gameBoard.style.width = `${rowWidth}px`;
        updateSelectAndButtonWidth();
    }

    function updateSelectAndButtonWidth() {
        const firstRow = gameBoard.querySelector('.row');
        if (firstRow) {
            const firstRowWidth = firstRow.offsetWidth;
            fieldSelect.style.width = `${firstRowWidth}px`;
        }
    }

    function placeDot(rowNumber) {
        triggerHapticFeedback();
        const rows = Array.from(gameBoard.querySelectorAll('.row'));
        const squares = rows[numRows - 1 - rowNumber].querySelectorAll('.square');
        const randomSquare = Math.floor(Math.random() * squares.length);

        const neonCircle = squares[randomSquare].querySelector('.neon-circle');
        neonCircle.style.opacity = 1;
    }

    function addRowWithDot() {
        triggerHapticFeedback();
        const newRow = document.createElement('div');
        newRow.className = 'row';
        for (let i = 0; i < numCols; i++) {
            const newSquare = document.createElement('div');
            newSquare.className = 'square';
            newSquare.style.width = `${squareSize}px`;
            newSquare.style.height = `${squareSize}px`;

            const neonCircle = document.createElement('div');
            neonCircle.className = 'neon-circle';
            newSquare.appendChild(neonCircle);

            newRow.appendChild(newSquare);
        }
        gameBoard.insertBefore(newRow, gameBoard.firstChild);
        placeDotInNewRow(newRow);
        updateSelectAndButtonWidth();
    }

    function placeDotInNewRow(newRow) {
        const squares = newRow.querySelectorAll('.square');
        const randomSquare = Math.floor(Math.random() * squares.length);

        const neonCircle = squares[randomSquare].querySelector('.neon-circle');
        neonCircle.style.opacity = 1;
    }

    function removeRowWithDot() {
        gameBoard.removeChild(gameBoard.lastChild);
        updateSelectAndButtonWidth();
    }

    function maintainRowCount() {
        while (gameBoard.children.length > numRows) {
            gameBoard.removeChild(gameBoard.lastChild);
        }
    }

    function clearAllSquares() {
        const circles = gameBoard.querySelectorAll('.neon-circle');
        circles.forEach(circle => circle.style.opacity = 0);
    }

    resetButton.addEventListener('click', () => {
        triggerHapticFeedback();
        clearAllSquares();
        dotsCount = 0;
    });

    function showNotification(message) {
        const notification = $('#notification');

        // Устанавливаем сообщение и показываем уведомление
        notification.text(message).show().css('z-index', '10000').removeClass('fade-out');

        // Через notificationDisplayMiliseconds секунды скрываем уведомление
        let notificationDisplayMiliseconds = 3 * 1000;

        setTimeout(function() {
            notification.addClass('fade-out');
            setTimeout(function() {
                notification.hide();
            }, 500);  // Время для завершения анимации
        }, notificationDisplayMiliseconds);  // Время отображения уведомления
    }

    playButton.addEventListener('click', () => {
        if (dotsCount >= maxDots) {
            showNotification("Game is over! Press reset button.");
            return;
        }

        if (dotsCount < numRows) {
            placeDot(dotsCount);
        } else {
            removeRowWithDot();
            addRowWithDot();
        }
        dotsCount++;
        maintainRowCount();
    });

    fieldSelect.addEventListener('change', () => {
        const selectedField = fieldSelect.value;
        if (selectedField === "6x15") {
            numRows = 5;
            numCols = 6;
            maxDots = 15;
            squareSize = 52;
        } else if (selectedField === "3x6") {
            numRows = 3;
            numCols = 3;
            maxDots = 6;
            squareSize = 70;
        } else if (selectedField === "2x3") {
            numRows = 2;
            numCols = 2;
            maxDots = 3;
            squareSize = 90;
        } else if (selectedField === "4x9") {
            numRows = 4;
            numCols = 4;
            maxDots = 9;
            squareSize = 65;
        } else if (selectedField === "5x12") {
            numRows = 5;
            numCols = 5;
            maxDots = 12;
            squareSize = 60;
        }
        initializeBoard();
        updateBoardSize();
        clearAllSquares();
        dotsCount = 0;
    });

    window.addEventListener('resize', () => {
        updateBoardSize();
    });

    initializeBoard();
    updateBoardSize();
});

document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault(); // Отключаем стандартное поведение при мультитач событиях
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault(); // Отключаем двойное нажатие
    }
    lastTouchEnd = now;
}, false);


 // This project was developed by @winlikesam (Telegram) 