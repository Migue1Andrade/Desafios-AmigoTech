const date = new Date('2022-06-07T01:01:06.336Z');

addZero = num => {
	return num >= 10 ? num : `0${num}`;
};

const result = date.toLocaleString('pt-BR', {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false
});

addZero(result);
console.log(result);
