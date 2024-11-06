const dataFormat = new Date("2022-06-07T01:01:06.336Z");

const options = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit'
};

dataFormat.toLocaleDateString('pt-BR');

const data = () => {
	const year = dataFormat.getFullYear();
	const mouth = dataFormat.getMonth() + 1;
	const day = dataFormat.getDate();

	return `${day}/${mouth}/${year}`;
};

console.log(data(dataFormat));
