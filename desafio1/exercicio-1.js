// Dado array abaixo, monte um novo array com apenas números (inteiros e decimais) seguindo as regras:

// Cada valor do novo array deve ser somado com o número anterior
// Se o novo valor não for par, deverá ser inserido um novo número anterior a ele somando + 0.5
// const arrayNumeros = [0, '1', '1.5', 2, 3, 4, 5, 6, 7, '8', 9];

const arrayNumeros = [0, "1", "1.5", 2, 3, 4, 5, 6, 7, "8", 9];

const newArray = arrayNumeros.filter((element) => typeof element === "number");
console.log(`array sem as strings ${newArray}`);

const sumArray = array => {
	for (let i = 0; i < array.length; i++) {
		array[i] += array[i + 1];
	};
	return;
};

const addHalf = array => {
	for (let i = 1; i < array.length; i++) {
		if (array[i] % 2 !== 0) {
			array[i - 1] += 0.5;
		};
	};
	return array;
};

sumArray(newArray);
const arrayWithDoutNaN = newArray.filter(element => !isNaN(element));
addHalf(arrayWithDoutNaN);
console.log(arrayWithDoutNaN);
