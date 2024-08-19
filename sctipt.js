'use strict';
const form = document.forms['form-actions'];
const inputEnter = form['input-enter'];
const items = document.querySelector('.do__items');
let i = 0;
const addItem = e => {
	if (inputEnter.value.length > 0) {
		i += 1;
		items.insertAdjacentHTML(
			'beforeend',
			`<div class="do__item">
      <input type="checkbox" id="checkbox-${i}" class="do__item-input"> 
      <label class="do__item-label" for="checkbox-${i}">${inputEnter.value}</label>
      <img class="do__delete" src="/svg/delete.svg" alt="Delete icon"></div>`
		);
		inputEnter.value = '';
		saveData();
	}
};

const deleteItem = e => {
	if (e.target.classList.contains('do__delete')) {
		e.target.closest('.do__item').remove();
		saveData();
	}
};

const saveData = () => {
	localStorage.setItem('data', items.innerHTML);
	localStorage.setItem('index', i);
};

const showData = () => {
	items.innerHTML = localStorage.getItem('data');
	if (localStorage.getItem('index')) {
		i = +localStorage.getItem('index');
	}
};

window.addEventListener('load', showData);
form['input-active'].addEventListener('click', addItem);
items.addEventListener('click', deleteItem);
