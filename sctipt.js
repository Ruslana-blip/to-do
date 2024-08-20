'use strict';
const form = document.forms['form-actions'];
const inputEnter = form['input-enter'];
const htmlList = document.querySelector('.do__items');
let list = [];

const addItem = e => {
	e.preventDefault();
	if (!inputEnter.value) return;
	const todo = {
		id: Date.now(),
		value: inputEnter.value,
	};
	list.push(todo);
	drawHtml(todo);
	inputEnter.value = '';
	saveData();
};

const drawHtml = ({ id, value }) => {
	htmlList.insertAdjacentHTML(
		'beforeend',
		/*html*/ `
			<li class="do__item">
				<input 
					data-id="${id}"
					type="checkbox" 
					id="checkbox-${id}"
					class="do__item-input"
				> 
				<label 
					class="do__item-label" 
					for="checkbox-${id}"
				>
					${value}
				</label>
				<img 
					class="do__delete" 
					src="./svg/delete.svg" 
					alt="Delete icon"
				>
			</li>`
	);
};

const deleteItem = e => {
	if (e.target.closest('.do__delete')) {
		e.target.closest('.do__item').remove();
		list = list.filter(
			({ id }) => id !== +e.target.closest('.do__item').dataset.id
		);
		saveData();
	}
};

const saveData = () => localStorage.setItem('todoList', JSON.stringify(list));

const showData = () => {
	const data = JSON.parse(localStorage.getItem('todoList'));
	if (!data) return;
	list.push(...data);
	data.forEach(({ id, value }) => drawHtml({ id, value }));
};

document.addEventListener('DOMContentLoaded', showData);
form['input-active'].addEventListener('click', addItem);
form.addEventListener('submit', addItem);
htmlList.addEventListener('click', deleteItem);
