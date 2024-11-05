const arrayNumeros = [0, "1", "1.5", 2, 3, 4, 5, 6, 7, "8", 9];

const novoArray = arrayNumeros.filter((elemento) => typeof elemento === "number");
console.log(`array sem as strings ${novoArray}`);

function somaArray(array) {
	for (let i = 0; i < array.length; i++) {
		array[i] += array[i + 1];
	}
	return;
}

function adicionarMeioAosAnterioresImpares(array) {
	for (let i = 1; i < array.length; i++) {
		if (array[i] % 2 !== 0) { 
		array[i - 1] += 0.5; 
		}
  }
  return array;
}

somaArray(novoArray);
const arraySemNaN = novoArray.filter(element => !isNaN(element));
console.log(`array somado o primeiro com o segundo ${arraySemNaN}`);
adicionarMeioAosAnterioresImpares(arraySemNaN);
console.log(`array adicionando 0.5 ao anterior ${arraySemNaN}`);
console.log(arraySemNaN)