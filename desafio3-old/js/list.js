let dataTableCopy;
let dataInsurancesCopy;
let flag;
let isOrderned = true;
let paginationButtonFlag = true;
let paginationFlag = true;
let currentPage = 0;
let currentGuides = [];
let guidesToDisplay = [];
let isEmpyty = false;
let notFounded = false;

const guidesPerPage = 2;
const thumbUrl = "https://placehold.co/150x150";
const table = document.querySelector('.table tbody');
const select = document.querySelector('.search-select');
const selectValue = parseInt(select.value);
const navBar = document.querySelector('.search');
const input = document.getElementById('input-search');
const div = document.querySelector('.search');
const dateStart = document.querySelector('.start');
const dateEnd = document.querySelector('.end');
const day = document.getElementById('month');
const month = document.getElementById('day');
const icon = document.getElementById('icon');
const firstButton = document.getElementById('first-btn');
const lastButton = document.getElementById('last-btn');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const paginationButtons = document.getElementById('page-buttons');
const paginationDiv = document.querySelector('.pagination');
const root = document.querySelector('.root'); 
const expectedHTML = `
 <div class="search">
			<p>Pesquisar</p> 
			<input type="text" id="input-search" placeholder="buscar...">
			<input id="dateTime" class="start" type="date" placeholder="Data de Início" oninput="yearLimit(this)">
			<input id="dateTime" class="end" type="date" placeholder="Data de Fim" oninput="yearLimit(this)">
			<button id="month">mes</button>
			<button id="day">dia</button>
			<select required="" class="search-select">
				<option value="convenio">convênio</option>
			<option value="3322">Amil</option><option value="3293">Bradesco</option><option value="99231">Hapvida</option><option value="1322">CASSI</option><option value="23111">Sulamérica</option><option value="8323">Amil Cooperados</option><option value="27172">Amil 500</option><option value="92813">TRT</option><option value="18293">PLAN ASSIST</option><option value="23321">AMEPE CAMPE</option><option value="12322">ASSEFAZ</option><option value="2881">BANCO CENTRAL</option><option value="992">CAMED SAÚDE</option></select>
		</div>
		<div>
			<table class="table">
				<thead>
					<tr>
					<th>Data</th>
					<th>Número</th>
					<th> 
						<i class="fa-solid fa-sort-up" id="icon"></i>    
						Paciente
					</th>
					<th>Convênio</th>
					<th>Preço</th>
					</tr>
				</thead>
				<tbody></tbody>
				</table>
		</div>
`.trim();
const OtherExpectedHtml = `
 <div class="search">
			<p>Pesquisar</p> 
			<input type="text" id="input-search" placeholder="buscar...">
			<input id="dateTime" class="start" type="date" placeholder="Data de Início" oninput="yearLimit(this)">
			<input id="dateTime" class="end" type="date" placeholder="Data de Fim" oninput="yearLimit(this)">
			<button id="month">mes</button>
			<button id="day">dia</button>
			<select required="" class="search-select">
				<option value="convenio">convênio</option>
			<option value="3322">Amil</option><option value="3293">Bradesco</option><option value="99231">Hapvida</option><option value="1322">CASSI</option><option value="23111">Sulamérica</option><option value="8323">Amil Cooperados</option><option value="27172">Amil 500</option><option value="92813">TRT</option><option value="18293">PLAN ASSIST</option><option value="23321">AMEPE CAMPE</option><option value="12322">ASSEFAZ</option><option value="2881">BANCO CENTRAL</option><option value="992">CAMED SAÚDE</option></select>
		</div>
		<div>
			<table class="table">
				<thead>
					<tr>
					<th>Data</th>
					<th>Número</th>
					<th> 
						<i class="fa-solid fa-sort-down" id="icon"></i>    
						Paciente
					</th>
					<th>Convênio</th>
					<th>Preço</th>
					</tr>
				</thead>
				<tbody></tbody>
				</table>
		</div>
`.trim();

const tableJson = () => {
	fetch('https://augustoferreira.com/augustoferreira/amigo/guides.json')
	.then(response => {
		if (!response.ok) throw new Error('Rede não ok');

		return response.json();
	}).then(data => {
		dataTableCopy = data.data;
		if (dataTableCopy && dataTableCopy.guides) {
			dataTableCopy.guides.forEach(guide => completingHealthInsurances(dataTableCopy.guides, dataInsurancesCopy));
			
			const sortedGuidesResult = sortedGuides(dataTableCopy.guides); 

			createPagination(dataTableCopy.guides.length, sortedGuidesResult);
			createTableRows(dataTableCopy.guides);
		};
		currentMonth();
	}).catch(error => {
		console.error('Erro ao buscar o JSON:', error);
	});
};

const insuranceJson = () => {
	fetch('https://augustoferreira.com/augustoferreira/amigo/insurances.json')
	.then(response => {
		if (!response.ok) throw new Error('Rede não ok');

		return response.json();
	}).then(data => {
		dataInsurancesCopy = data.data;

		createSelectorChilds();
	}).catch(error => {
		console.error('Erro ao buscar o JSON:', error);
	});
};

const completingHealthInsurances = (guides, healthInsurances) => {
	guides.forEach(guide => {
		if (guide.health_insurance === null) {
			const insurance = healthInsurances.find(num => num.id === guide.insurance_id);
			if (insurance) {
				guide.health_insurance = {
					id: insurance.id,
					name: insurance.name,
					is_deleted: false,
				};
			}
		}
	});
};

const warning = () => {
	const warning = document.createElement('div');

	document.querySelector('.search').style.display = 'none';
	document.querySelector('.table').style.display = 'none';

	warning.id = 'reload-warning';
	warning.innerHTML = 'Por favor, recarregue a página';

	document.body.appendChild(warning);
	warning.style.display = 'block';
};

const isValid = () => {
	const divContent = root.innerHTML.trim();

	if (divContent === expectedHTML || divContent === OtherExpectedHtml) return; 

	else warning();
};

const createSelectorChilds = () => {
	const optionsData = dataInsurancesCopy.map(insurance => ({
		value: insurance.id,
		text: insurance.name
	}));

	optionsData.forEach(insurance => {
		const option = document.createElement('option');
		
		option.value = insurance.value;
		option.text = insurance.text;

		select.appendChild(option);
	});
};

const currentDate = () => {
	const today = new Date();
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	dateStart.value = formatDateToDataInput(firstDayOfMonth);
	dateEnd.value = formatDateToDataInput(lastDayOfMonth);
}; 

const currentMonth = () => {
	const today = new Date();
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	dateStart.value = formatDateToDataInput(today);
	dateEnd.value = formatDateToDataInput(lastDayOfMonth);
};

const callDataByData = () => {
	if (dateStart.value && dateEnd.value) {
		const startDate = new Date(dateStart.value);
		const endDate = new Date(dateEnd.value);
		const dataFilter = dataTableCopy.guides.filter(guide => {
			const guideDate = new Date(guide.start_date);

			return guideDate >= startDate && guideDate <= endDate;
		});

		createTableRows(dataFilter);
	};
};

const sortedGuides = guides => isOrderned ? guides.sort((guideA, guideB) => guideA.patient.name.localeCompare(guideB.patient.name)) : guides.reverse();

select.addEventListener('change', () => {
	const selectValue = parseInt(select.value);

	paginationFlag = true;
	paginationButtonFlag = true;

	if (dataTableCopy && dataTableCopy.guides) {
		const filteredGuides = dataTableCopy.guides.filter(guide => guide.insurance_id === selectValue);

		createTableRows(filteredGuides);
	};
	if (select.value === 'convenio') {
		currentPage = 0; 

		updateTable(dataTableCopy.guides);
		inicialPagination();
	};
	dateStart.value = '';
	dateEnd.value = '';
});

const updateTable = guides => {
	const startIndex = currentPage * guidesPerPage;
	const endIndex = startIndex + guidesPerPage;

	guidesToDisplay = guides.slice(startIndex, endIndex);

	createTableRows(guidesToDisplay);
};

const inicialPagination = () => {
	paginationFlag = true;
	paginationButtonFlag = true;

	createPagination(dataTableCopy.guides.length, sortedGuides(dataTableCopy.guides));
};

prevButton.addEventListener('click', () => {
	if (notFounded) return;
	if (currentPage > 0) {
		currentPage--;

		updateTable(dataTableCopy.guides);
	};
	inicialPagination();
});

nextButton.addEventListener('click', () => {
	if (notFounded) return;

	const totalPages = Math.ceil(dataTableCopy.guides.length / guidesPerPage);

	if (currentPage < totalPages - 1) {
		currentPage++;
		updateTable(dataTableCopy.guides);
	};

	inicialPagination();
});

firstButton.addEventListener('click', () => {
	currentPage = 0;
	notFounded = false;

	updateTable(dataTableCopy.guides);
	inicialPagination();
});

lastButton.addEventListener('click', () => {
	const totalPages = Math.ceil(dataTableCopy.guides.length / guidesPerPage);

	currentPage = totalPages - 1;
	notFounded = false;

	updateTable(dataTableCopy.guides);
	inicialPagination();
});

day.addEventListener('click', () => {
	currentDate();
	callDataByData();
});

month.addEventListener('click', () => {
	currentMonth();
	callDataByData();
});

icon.addEventListener('click', () => {
	const sorted = sortedGuides(guidesToDisplay);

	isOrderned = !isOrderned;

	if (isOrderned) {
		icon.classList.remove('fa-sort-down');
		icon.classList.add('fa-sort-up');
	} else {
		icon.classList.remove('fa-sort-up');
		icon.classList.add('fa-sort-down');
	};

	createTableRows(sorted);
	inicialPagination();
});

dateEnd.addEventListener('change', () => {
	callDataByData(); 
});

input.addEventListener('input', () => {

const inputFilter = dataTableCopy.guides.filter(guide => guide.patient.name.toLowerCase().includes(input.value.toLowerCase()) ||
guide.number.includes(input.value));

paginationFlag = true;
paginationButtonFlag = true;

createTableRows(inputFilter);

	dateStart.value = '';
	dateEnd.value = '';
});

const formatDateToDataInput = date => {
	const data = new Date(date);
	const day = data.getDate().toString().padStart(2, '0');
	const mounth = (data.getMonth() + 1).toString().padStart(2, '0');
	const year = data.getFullYear();

	return `${year}-${mounth}-${day}`;
};

const formatDate = date => {
	const data = new Date(date);
	const day = data.getDate().toString().padStart(2, '0');
	const mounth = (data.getMonth() + 1).toString().padStart(2, '0');
	const year = data.getFullYear();

	return `${day}/${mounth}/${year}`;
};

const isInsuranceDelete = healthInsurance => !healthInsurance ? '-' : healthInsurance.is_deleted ? `<span style="text-decoration: line-through;">${healthInsurance.name}</span>` : healthInsurance.name;

const witchTumb = (patient, image) => image.src = patient.thumb_url || thumbUrl;

const isNull = (row, guide) => {
	if (!guide) return row.insertCell().innerHTML = '-';

	else return row.insertCell().innerHTML = guide;
};

const ifNaN = guide => {
	if(isNaN(guide))guide = '-';

	return guide.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

const createPagination = (count, guides) => {
	let guidesCopy = [...guides || []];

	const totalPages = Math.ceil(count / guidesPerPage);

	if (isEmpyty) { paginationButtons.innerHTML = ''; return };
	if (paginationFlag) paginationButtons.innerHTML = '';

	for (let i = 0; i < totalPages; i++) {
		const button = document.createElement('button');

		button.textContent = `${i + 1}`;

		button.addEventListener('click', () => {
			const startIndex = i * guidesPerPage;
			const endIndex = startIndex + guidesPerPage;
			const guidesToDisplay2 = guidesCopy.slice(startIndex, endIndex);

			paginationFlag = false;
			paginationButtonFlag = false;

			createTableRows([...guidesToDisplay2]);
		});

		if(paginationButtonFlag) paginationButtons.appendChild(button);
	};

	for (let i = 0; i < totalPages; i++) {
		const startIndex = i * guidesPerPage;
		const endIndex = startIndex + guidesPerPage;

		guidesToDisplay = guidesCopy.slice(startIndex, endIndex);
	};

	return guidesToDisplay;
};

const insertEmptyState = () => {
	const newRow = table.insertRow();
	const cell = newRow.insertCell();

	cell.colSpan = 5;
	cell.style.textAlign = 'center';
	cell.innerHTML = 'nenhuma guia encontrada';

	notFounded = true;

	createPagination(0, []);
};

const buildTables = guide => {
	const row = table.insertRow();

	isNull(row, formatDate(guide.start_date));
	isNull(row, guide.number);

	const profileCell = row.insertCell();
	profileCell.classList.add('profile-cell');

	const img = document.createElement('img');
	img.classList.add('profile-image');
	witchTumb(guide.patient, img);

	profileCell.appendChild(img);
	profileCell.appendChild(document.createTextNode(guide.patient.name));

	isNull(row, isInsuranceDelete(guide.health_insurance));
	isNull(row, ifNaN(guide.price));
};

const createTableRows = guides => {
	const count = guides.length;

	table.innerHTML = '';

	isValid();

	if (!guides.length) {
		return insertEmptyState();
	};

	createPagination(count, guides).forEach(guide => {
		buildTables(guide);
	});
};

const yearLimit = input => {
	if (input.value.length > 10) {
		input.value = input.value.slice(10, 11);
	};
};

const init = () => {
	insuranceJson();
	tableJson();
};

init();
