const arrayNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

arrayNumeros.filter(numero => numero % 2 === 0).forEach(numeroPar => {
    console.log(numeroPar);
  });