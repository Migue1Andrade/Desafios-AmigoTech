const dataJson = {
	insurances: [{
		id: 3322,
		name: "Amil"
	}, {
		id: 3293,
		name: "Bradesco"
	}, {
		id: 99231,
		name: "Hapvida"
	}, {
		id: 1322,
		name: "CASSI"
	}, {
		id: 23111,
		name: "Sulamérica"
	}],
	guides: [{
		number: "3210998321",
		start_date: "2021-04-23T19:18:47.210Z",
		patient: {
			id: 9321123,
			name: "Augusto Ferreira",
			thumb_url: "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
		},
		insurane_id: 1322,
		health_insurance: {
			id: 1322,
			name: "CASSI",
			is_deleted: false
		},
		price: 5567.2
	}, {
		number: "287312832",
		start_date: "2021-04-23T19:18:47.210Z",
		patient: {
			id: 93229123,
			name: "Caio Carneiro",
			thumb_url: "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
		},
		insurane_id: 1322,
		health_insurance: {
			id: 1322,
			name: "CASSI",
			is_deleted: false
		},
		price: 213.3
	}, {
		number: "283718273",
		start_date: "2021-04-22T19:18:47.210Z",
		patient: {
			id: 213122388,
			name: "Luciano José",
			thumb_url: "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
		},
		insurane_id: 3293,
		health_insurance: {
			id: 3293,
			name: "Bradesco",
			is_deleted: true
		},
		price: 88.99
	}, {
		number: "009090321938",
		start_date: "2021-04-20T19:18:47.210Z",
		patient: {
			id: 3367263,
			name: "Felício Santos",
			thumb_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
		},
		insurane_id: 3293,
		health_insurance: {
			id: 3293,
			name: "Bradesco",
			is_deleted: true
		},
		price: 828.99
	}, {
		number: "8787128731",
		start_date: "2021-04-01T19:18:47.210Z",
		patient: {
			id: 777882,
			name: "Fernando Raposo"
		},
		insurane_id: 3322,
		health_insurance: {
			id: 3322,
			name: "Amil",
			is_deleted: false
		},
		price: 772
	}, {
		number: "12929321",
		start_date: "2021-04-02T19:18:47.210Z",
		patient: {
			id: 221,
			name: "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
		},
		insurane_id: 3322,
		health_insurance: {
			id: 3322,
			name: "Amil",
			is_deleted: false
		},
		price: 221
	}]
};

const dataCopy = {...dataJson};
const table = document.querySelector('.table tbody');
const select = document.querySelector('.search-select');
const input = document.getElementById('input-search');

const createSelectorChilds = () => {
	const optionsData = dataJson.insurances.map(insurance => ({
		value: insurance.id,
		text: insurance.name
	}));

	optionsData.forEach(optionData => {
		const option = document.createElement('option');
		option.value = optionData.value;
		option.text = optionData.text;
		select.appendChild(option);
	});
};

select.addEventListener('change', () => {
	const selectValue = parseInt(select.value);
	const filteredGuides = dataCopy.guides.filter(guide => guide.insurane_id === selectValue);

	createTableRows(filteredGuides);

	if (select.value === 'convenio') {
		createTableRows(dataCopy.guides);
	};
});

input.addEventListener('keypress', event => {
	const keyCodeEvent = event.key === 'Enter';
	let inputFilter = dataCopy.guides.filter(guide => guide.patient.name.toLowerCase().includes(input.value.toLowerCase()) || guide.number.includes(input.value));

	if (keyCodeEvent) createTableRows(inputFilter);
});

const formatDate = date => {
	const data = new Date(date);
	const day = data.getDate().toString().padStart(2, '0');
	const mounth = (data.getMonth() + 1).toString().padStart(2, '0');
	const year = data.getFullYear();

	return `${day}/${mounth}/${year}`;
};

const isDelete = healthInsurance => healthInsurance.is_deleted ? `<span style="text-decoration: line-through;">${healthInsurance.name}</span>` : healthInsurance.name;

const witchTumb = (patient, image) => image.src = patient.thumb_url || "https://placehold.co/150x150";

const createTableRows = guides => {
	table.innerHTML = '';

	if (guides.length === 0) {
		const newRow = table.insertRow();
		const cell = newRow.insertCell();

		cell.colSpan = 5;
		cell.style.textAlign = 'center'; 
		cell.innerHTML = 'nenhuma guia encontrada';

		return;
	} else {
			guides.forEach(guide => {

				const row = table.insertRow();
				row.insertCell().innerHTML = formatDate(guide.start_date);
				row.insertCell().innerHTML = guide.number;

				let profileCell = row.insertCell();
				profileCell.classList.add('profile-cell');

				let img = document.createElement('img');
				img.classList.add('profile-image');
				witchTumb(guide.patient, img);
				profileCell.appendChild(img);
				profileCell.appendChild(document.createTextNode(guide.patient.name));

				row.insertCell().innerHTML = isDelete(guide.health_insurance);
				row.insertCell().innerHTML = guide.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
			});
	};
};

const init = () => {
	createSelectorChilds();
};

init();
