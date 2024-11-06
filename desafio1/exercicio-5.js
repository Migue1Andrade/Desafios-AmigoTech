// Crie uma função que retorne a data passada formatada de acordo com os patterns abaixo:

// DIA (DD)
// DIA/MES (DD/MM)
// DIA/MES/ANO (DD/MM/YYYY)
//     const dataFormatada = formatarData(new Date((), 'DD/MM/YYYY'); // 2022-06-07T01:01:06.336Z
//     console.log(dataFormatada); // resultado: 07/06/2022

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
