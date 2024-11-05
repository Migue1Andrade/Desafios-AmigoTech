const dataFormatada = new Date("2022-06-07T01:01:06.336Z");

const options = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit'
};

dataFormatada.toLocaleDateString('pt-BR', options);

const data = () => {
	const ano = dataFormatada.getFullYear();
	const mes = dataFormatada.getMonth() + 1;
	const dia = dataFormatada.getDate();

	return `${dia}/${mes}/${ano}`;
};

console.log(data(dataFormatada));
