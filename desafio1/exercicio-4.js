// Crie uma função que retorna o mês por extenso de uma data qualquer passada por parâmetro, exemplo:

// const dataAtual = new Date(); // 2022-06-07T01:01:06.336Z
// const mesExtenso = retornaMesPorExtenso(dataAtual);
// console.log(mesExtenso); // Junho
// Obs.: Como exemplo o mês da data passada seria Junho.

const toDayDate = new Date('2022-06-07T01:01:06.336Z');

parseMouthToString = data => {
	const mouth = data.getMonth() + 1;

	switch (mouth) {
		case 1:
			return 'Janeiro';
			break;

		case 2:
			return 'Fevereiro';
			break;

		case 3:
			return 'Março';
			break;

		case 4:
			return 'Abril';
			break;

		case 5:
			return 'Maio';
			break;

		case 6:
			return 'Junho';
			break;

		case 7:
			return 'Julho';
			break;

		case 8:
			return 'Agosto';
			break;

		case 9:
			return 'Setembro';
			break;

		case 10:
			return 'Outubro';
			break;

		case 11:
			return 'Novembro';
			break;

		case 12:
			return 'Dezembro';
			break;
	}
}

const resultMouth = parseMouthToString(toDayDate);
console.log(resultMouth);
