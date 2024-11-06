let count = 0;

const row = (num1, num2) => {
	if (num1 > 15 || num2 > 2) return console.log('nao podemos ter mais que 15 linhas,  nem podemos ter mais que 2 linhas por cada pagina');

	while (count < num1) {
		for (let i = 0; i < num2; i++) {
			if (count === 14 && i === 0) {
				console.log(`<li>página: ${count * num2 + i + 1}</li>`);
				break;
			} else {
				console.log(`<li>página: ${count * num2 + i + 1}</li>`);
			};
		};

		count++;
	};
};

row(15, 2);
