let timer = document.querySelector('.scoreboard__timer');
let minutes = document.querySelector('.scoreboard__timer-minutes');
let seconds = document.querySelector('.scoreboard__timer-seconds');

let min = 0;
let sec = 0;

setInterval(function () {
	minutes.innerText = min < 10 ? `${'0' + min + ':'}` : min + `:`;
	seconds.innerText = sec < 10 ? `${'0' + sec}` : sec;
	if (sec > 59) {
		min++;
		sec = 0;
	} else {
		sec++;
	}
}, 1000);

let reload = document.querySelector('.scoreboard__reload');

reload.addEventListener('click', () => {
	location.reload();
});