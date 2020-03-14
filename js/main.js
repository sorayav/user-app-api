'use strict';

const elemList = document.querySelector('#users-list');
const urlBase = 'https://randomuser.me/api/?results=10';
//https://randomuser.me/

let users = null;
const friends = [];

//DO YOUR MAGIC!

function connectToApi() {
    fetch(urlBase)
    .then (response => response.json())
    .then (data => {
        users = data.results;
        renderUsers(users);
    })
}

function renderUsers(arr) {
    for(let item of arr) {
        elemList.innerHTML += `<li class='users-list__li'><div class='users-list__item-info'><img src='${item.picture.large}' alt='${item.name.first}'><span> ${item.name.first} ${item.name.last}</span></div>
        <div class='btn'>
        <button type='button' id='${item.login.uuid}' class='users-list__item--add user__btn'>Añadir amigo</button>
        <button type='button' id='${item.login.uuid}' class='users-list__item--rem user__btn'>Eliminar amigo</button></div></li>`
    }
    addClickListeners();
    removeClickListeners();
}

function addClickListeners() {
    const userLiElement = document.querySelectorAll('.users-list__item--add');
    for (let userLi of userLiElement) {
        userLi.addEventListener('click', saveFriends);
    }
}

function removeClickListeners() {
    const userRemElement = document.querySelectorAll('.users-list__item--rem');
    for (let userRem of userRemElement) {
        userRem.addEventListener('click', removeFriends);
    }
}

function saveFriends(evt) {
    const index = evt.currentTarget.id;
    if (friends.indexOf(index) === -1) {
        friends.push(index);
        alert('Añadido a amigos.');
        
    } else {
        alert('Este usuario ya es tu amigo.');
    }
}
    
function removeFriends(evt) {
    const indexRem = evt.currentTarget.id;
    if (friends.indexOf(indexRem) !== -1) {
        friends.splice(0,1);
        alert('Eliminado de amigos.');
    } else {
        alert('Este usuario no es tu amigo.');
    }
}

connectToApi();