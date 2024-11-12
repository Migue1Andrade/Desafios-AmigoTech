const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');
const power = document.querySelector('.power');
const counter = document.querySelector('.counter');
const timer = document.getElementById('time');

let atualTimerLight;
let controlAtualTimer;
let isGreen;
let isRed;
let isYellow;
let controlTimer;
let isPassed60s = true;
let currenteTimer = 60;
let isButtonClicked = false;

const buttonChecks = () => {
	if(isRed === true || isYellow === true) return;
	
	if(isGreen === true) {
		if(isPassed60s === false) alert('respeite o tempo de 60s');

		if (isPassed60s === true) {
			isPassed60s = false;
			isButtonClicked = true;
			atualTimerLight = 3;

			setTimeout(turnYellow, 3000);
			controlTimer = setInterval(updateTimer, 1000);
		};
	};
};

const greenSetTimeOut = () => {
    return setTimeout(() => {
        if (isButtonClicked === false) {
            turnYellow();
        } else {
            isButtonClicked = false;
        }
    }, 10000);
};

const decreaseAtualTimerLight = () => {
	atualTimerLight--;

	counter.textContent = `${atualTimerLight.toString().padStart(2, '0')}`;

	if (atualTimerLight <= 0) {
		clearInterval(controlAtualTimer);

		counter.textContent = "0";
	};
};

const turnRed = () => {
	red.style.backgroundColor = "red";
	green.style.backgroundColor = "black";
	yellow.style.backgroundColor = "black";
	counter.style.color = "red"; 

	setTimeout(turnGreen, 15000);

	isGreen = false;
	isYellow = false;
	isRed = true;
	atualTimerLight = 15;
};

const turnYellow = () => {
	yellow.style.backgroundColor = "yellow";
	red.style.backgroundColor = "black";
	green.style.backgroundColor = "black";

	setTimeout(turnRed, 3000);

	isGreen = false;
	isYellow = true;
	isRed = false;
};

const turnGreen = () => {
	green.style.backgroundColor = "rgb(71, 252, 71)";
	red.style.backgroundColor = "black";
	yellow.style.backgroundColor = "black";
	counter.style.color = "green";

	greenSetTimeOut();

	isGreen = true;
	isYellow = false;
	isRed = false;
	atualTimerLight = 10;
};

setInterval(decreaseAtualTimerLight, 1000);
turnGreen();

const updateTimer = () => {
	const seconds = currenteTimer % 60;
	currenteTimer--;

	timer.textContent = `${seconds.toString().padStart(2, '0')}`;

	if (currenteTimer <= 0) {
		isPassed60s = true;
		timer.textContent = "0";
		currenteTimer = 60;

		clearInterval(controlTimer);
	};
};

power.addEventListener('click', function(event){
	buttonChecks();
});
