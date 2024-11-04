const arrayNumeros = [0, "1", "1.5", 2, 3, 4, 5, 6, 7, "8", 9];

function criarNovoArray(array) {
  const novoArray = [];

  for (let i = 0; i < 8; i++) {
    let soma = array[i];

    if (i > 0) {
      soma += array[i - 1];
    }

    novoArray.push(soma);

    if (soma % 2 !== 0) {
      novoArray.splice(i, 0, soma + 0.5);
      
      i++;
    }
  }

  return novoArray;
}

const array = arrayNumeros.filter((elemento) => typeof elemento === "number");

const resultado = criarNovoArray(array);
