// Utilize o forEach e o filter para gerar um novo array filtrando apenas os números pares.

// Realize com o forEach
// Realize com o filter
// const arrayNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const arrayNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

arrayNumeros.filter(number => number % 2 === 0).forEach(parNumber => {
	console.log(parNumber);
});
