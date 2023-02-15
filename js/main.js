let url_string = window.location.href;
let url = new URL(url_string);
let gameMode = url.searchParams.get('gameMode');
let numberOfMatches;

let moves = document.querySelector('.scoreboard__moves');

let gameBoard = document.querySelector('.card-game__board');
gameBoard.dataset.gamemode = gameMode;

let card = document.querySelector('.card-game__board td');
fillBoard(gameBoard);

let cards = document.querySelectorAll('td');

cards.forEach(card => {
	card.addEventListener('click', flipCardEvent);
})

let hasFlipped = false;
let boardLock = false;
let firstCard, secondCard;
let turns = 0;

function flipCardEvent() {
	if (boardLock) return;
	if (this === firstCard) return;

	this.classList.add('flipped');
	moves.innerText = `Ходов: ${++turns}`;

	if (!hasFlipped) {
		hasFlipped = true;
		firstCard = this;

		return;
	}

	secondCard = this;
	checkForMatch();
}

function checkForMatch() {
	if (firstCard.classList.value === secondCard.classList.value) {
		disableCards();
	} else {
		unflipCards();
	}
}

function disableCards() {
	boardLock = true;
	setTimeout(() => {
		firstCard.removeEventListener('click', flipCardEvent);
		secondCard.removeEventListener('click', flipCardEvent);

		firstCard.classList.remove('flipped');
		secondCard.classList.remove('flipped');

		firstCard.classList.add('done');
		secondCard.classList.add('done');
		numberOfMatches--;

		if (numberOfMatches === 0) {
			let popup = document.querySelector('.popup');
			popup.classList.add('visible');

			let minutes = document.querySelector('.scoreboard__timer-minutes');
			let seconds = document.querySelector('.scoreboard__timer-seconds');
			let popupTime = document.querySelector('.popup-time');

			popupTime.innerText = minutes.innerText + seconds.innerText;

			let popupMoves = document.querySelector('.popup-turns');
			popupMoves.innerText = turns;
		}

		boardLock = false;
		resetBoard();
	}, 1500);
}

function unflipCards() {
	boardLock = true;

	setTimeout(() => {
		firstCard.classList.remove('flipped');
		secondCard.classList.remove('flipped');
		resetBoard();
	}, 1500);

}

function resetBoard() {
	hasFlipped = false;
	boardLock = false;
	firstCard = null;
	secondCard = null;
}

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
}

function fillArray(arr, length) {
	let index = 0;
	for (let i = 1; i <= length / 2; i++) {
		arr[index] = i;
		arr[index + 1] = i;
		index += 2;
	}
}

function fillBoard(board) {
	const [row, col] = setGameMode(gameMode);
	let numberOfCards = row * col;

	let arrOfPics = [];
	fillArray(arrOfPics, numberOfCards);
	shuffle(arrOfPics);

	let index = 0;
	for (let i = 0; i < row; i++) {
		let cardRow = document.createElement('tr');

		for (let j = 0; j < col; j++) {
			let card = document.createElement('td');
			card.classList.add('card__container', `${'pic' + arrOfPics[index]}`);

			let cardPicture = document.createElement('img');
			cardPicture.src = `${'./images/pic' + arrOfPics[index] + '.png'}`;
			cardPicture.classList.add('front-face');
			card.appendChild(cardPicture);

			cardRow.appendChild(card);
			index++;
		}

		board.appendChild(cardRow);
	}

}

function setGameMode(gameMode) {
	let row, col;
	let difficulty = document.querySelector('.scoreboard__difficulty');
	switch (gameMode) {
		case '1':
			row = 4;
			col = 3;
			difficulty.innerText = '12 картинок';
			numberOfMatches = 6;
			break;
		case '2':
			row = 4;
			col = 4;
			difficulty.innerText = '16 картинок';
			numberOfMatches = 8;
			break;
		case '3':
			row = 4;
			col = 5;
			difficulty.innerText = '20 картинок';
			numberOfMatches = 10;
			break;
		case '4':
			row = 4;
			col = 6;
			difficulty.innerText = '24 картинки';
			numberOfMatches = 12;
			break;
		case '5':
			row = 5;
			col = 6;
			difficulty.innerText = '30 картинок';
			numberOfMatches = 15;
			break;
	}

	return [row, col];
}

