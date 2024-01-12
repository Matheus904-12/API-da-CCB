const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sLivro = document.querySelector('#m-funcao');
const sCapitulo = document.querySelector('#m-number');
const sVersiculo = document.querySelector('#m-number');
const sData = document.querySelector('#m-date');

let itens;
let id;

function openModal(edit = false, index = 0) {
    modal.style.display = 'flex';

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.style.display = 'none';
        }
    };

    if (edit) {
        sNome.value = itens[index].nome;
        sLivro.value = itens[index].livro;
        sCapitulo.value = itens[index].capitulo;
        sVersiculo.value = itens[index].versiculo;
        sData.value = itens[index].data;
        id = index;
    } else {
        sNome.value = '';
        sLivro.value = '';
        sCapitulo.value = '';
        sVersiculo.value = '';
        sData.value = '';
    }
}

function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD();
    loadItens();
}

function saveItem() {
    if (sNome.value === '' || sLivro.value === '' || sCapitulo.value === '' || sVersiculo.value === '' || sData.value === '') {
        return;
    }

    if (id !== undefined) {
        itens[id].nome = sNome.value;
        itens[id].livro = sLivro.value;
        itens[id].capitulo = sCapitulo.value;
        itens[id].versiculo = sVersiculo.value;
        itens[id].data = sData.value;
    } else {
        itens.push({
            'nome': sNome.value,
            'livro': sLivro.value,
            'capitulo': sCapitulo.value,
            'versiculo': sVersiculo.value,
            'data': sData.value
        });
    }

    setItensBD();

    modal.style.display = 'none';
    loadItens();
    id = undefined;
}

function insertItem(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.livro}</td>
        <td>${item.data}</td>
        <td class="acao">
            <button onclick="openModal(true, ${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}

function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) || [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();
