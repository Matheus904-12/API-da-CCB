const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sLivro = document.querySelector('#m-funcao'); // Alterado para sLivro
const sCapitulo = document.querySelector('#m-number'); // Alterado para sCapitulo
const sVersiculo = document.querySelector('#m-number'); // Alterado para sVersiculo
const sData = document.querySelector('#m-funcao'); // Alterado para sData
const sAuxiliar = document.querySelector('#gender2');
const btnSalvar = document.querySelector('#btnSalvar');

let registros;
let id;

function openModal(edit = false, index = 0) {
    modal.style.display = 'flex';

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.style.display = 'none';
        }
    };

    if (edit) {
        sNome.value = registros[index].nome;
        sLivro.value = registros[index].livro;
        sCapitulo.value = registros[index].capitulo;
        sVersiculo.value = registros[index].versiculo;
        sData.value = registros[index].data;
        sAuxiliar.value = registros[index].auxiliar;
        id = index;
    } else {
        sNome.value = '';
        sLivro.value = '';
        sCapitulo.value = '';
        sVersiculo.value = '';
        sData.value = '';
        sAuxiliar.value = '';
    }
}

function deleteRegistro(index) {
    registros.splice(index, 1);
    setRegistrosBD();
    loadRegistros();
}

function saveRegistro() {
    if (sNome.value === '' || sLivro.value === '' || sCapitulo.value === '' || sVersiculo.value === '' || sData.value === '' || sAuxiliar.value === '') {
        return;
    }

    if (id !== undefined) {
        registros[id].nome = sNome.value;
        registros[id].livro = sLivro.value;
        registros[id].capitulo = sCapitulo.value;
        registros[id].versiculo = sVersiculo.value;
        registros[id].data = sData.value;
        registros[id].auxiliar = sAuxiliar.value;
    } else {
        registros.push({
            'nome': sNome.value,
            'livro': sLivro.value,
            'capitulo': sCapitulo.value,
            'versiculo': sVersiculo.value,
            'data': sData.value,
            'auxiliar': sAuxiliar.value
        });
    }

    setRegistrosBD();

    modal.style.display = 'none';
    loadRegistros();
    id = undefined;
}

function insertRegistro(registro, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${registro.nome}</td>
        <td>${registro.livro}</td>
        <td>${registro.data}</td>
        <td class="acao">
            <button onclick="openModal(true, ${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteRegistro(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}

function loadRegistros() {
    registros = getRegistrosBD();
    tbody.innerHTML = '';
    registros.forEach((registro, index) => {
        insertRegistro(registro, index);
    });
}

const getRegistrosBD = () => JSON.parse(localStorage.getItem('dbregistros')) || [];
const setRegistrosBD = () => localStorage.setItem('dbregistros', JSON.stringify(registros));

btnSalvar.onclick = e => {
    e.preventDefault();
    saveRegistro();
};

loadRegistros();
