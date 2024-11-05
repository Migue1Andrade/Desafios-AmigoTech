const date = new Date('2022-06-07T01:01:06.336Z');

const diaMesAno = date.toLocaleDateString('pt-BR'); 
console.log(diaMesAno);

const diaMesAnoHoraMinuto = date.toLocaleString('pt-BR', {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false
});
console.log(diaMesAnoHoraMinuto); 