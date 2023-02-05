const log = console.log;
const taskList = document.getElementById("taskList");

//#region TASK
const addTask = (form) => {
	let id = getUniqueID();
	let task = { name: form.name.value, done: false };
	localStorage.setItem(id, JSON.stringify(task));
	createTask(id, task);
};

const createAllTasks = () => {
	for (const [key, value] of Object.entries(localStorage))
		createTask(key, JSON.parse(value));
};

const createTask = (id, task) => {
	let article = document.createElement("article");
	article.id = id;
	taskList.appendChild(article);

	let div = document.createElement("div");
	div.innerHTML = task.name;
	article.appendChild(div);

	let doneBtn = document.createElement("img");
	doneBtn.src = task.done
		? "img/done-ring-round-svgrepo-com.svg"
		: "img/not-done-ring-round.svg";
	doneBtn.alt = "doneBtn";
	doneBtn.onclick = () => toggleDone(doneBtn, id);
	article.appendChild(doneBtn);

	let delBtn = document.createElement("img");
	delBtn.src = "img/close-square-svgrepo-com.svg";
	delBtn.alt = "delBtn";
	delBtn.onclick = () => delTask(article);
	article.appendChild(delBtn);
};

const delTask = (article) => {
	localStorage.removeItem(article.id);
	taskList.removeChild(article);
};
//#endregion TASK
const getUniqueID = () => {
	let id;
	do {
		id = Math.random().toString();
	} while (localStorage.getItem(id) !== null);
	return id;
};

const toggleDone = (doneBtn, id) => {
	task = JSON.parse(localStorage.getItem(id));
	task.done = !task.done;
	localStorage.setItem(id, JSON.stringify(task));

	doneBtn.src = task.done
		? "img/done-ring-round-svgrepo-com.svg"
		: "img/not-done-ring-round.svg";
};
