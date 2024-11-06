// Monte uma função que retorna HTML dinâmico que serão os elementos utilizados para uma paginação. Siga as regras:

// A função receberá dois parâmetros: total geral de itens e items por página
// O total geral de itens são 15
// Você só pode exibir 2 itens por página
// O número da página deve vir acompanhado do código dado como exemplo: Página 1/Página 2/Página 3, etc...
// Utilize o HTML <li> abaixo apenas como exemplo:

//     <li>Página 1</li>
//     <li>Página 2</li>
//     <li>Página 3</li>
//     <li>Página 4</li>
//     ...
// Exemplo de chamada:

// const meuHtmlDinamico = retornaHtmlDinamico(15, 2);
// console.log(meuHtmlDinamico);

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
