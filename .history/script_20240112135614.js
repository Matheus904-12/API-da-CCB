const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sAuxiliar = document.querySelector('#gender');
const sNome = document.querySelector('#m-nome');
const sLivro = document.querySelector('#m-livro');
const sCapitulo = document.querySelector('#m-capitulo');
const sVersiculo = document.querySelector('#m-versiculo');
const sData = document.querySelector('#m-date');
const btnSalvar = document.querySelector('#btnSalvar');

let registros = getRegistrosBD();
loadRegistros();





function openModal(edit = false, index = 0) {
    modal.style.display = 'flex';

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.style.display = 'none';
        }
    };

    if (edit) {
        sAuxiliar.value = registros[index].auxiliar;
        sNome.value = registros[index].nome;
        sLivro.value = registros[index].livro;
        sCapitulo.value = registros[index].capitulo;
        sVersiculo.value = registros[index].versiculo;
        sData.value = registros[index].data;
        id = index;
    } else {
        sAuxiliar.value = '';
        sNome.value = '';
        sLivro.value = '';
        sCapitulo.value = '';
        sVersiculo.value = '';
        sData.value = '';
    }
}





function deleteRegistro(index) {
    registros.splice(index, 1);
    setRegistrosBD();
    loadRegistros();
}





function saveRegistro() {
    if (sAuxiliar.value === '' || sNome.value === '' || sLivro.value === '' || sCapitulo.value === '' || sVersiculo.value === '' || sData.value === '') {
        return;
    }

    if (id !== undefined) {
        registros[id].auxiliar = sAuxiliar.value;
        registros[id].nome = sNome.value;
        registros[id].livro = sLivro.value;
        registros[id].capitulo = sCapitulo.value;
        registros[id].versiculo = sVersiculo.value;
        registros[id].data = sData.value;
    } else {
        registros.push({
            'nome': sNome.value,
            'livro': sLivro.value,
            'data': sData.value,
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
        <td>${registro.auxiliar}</td>
        <td>${registro.nome}</td>
        <td>${registro.livro}</td>
        <td>${registro.versiculo}</td>
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

const getRegistrosBD = () => JSON.parse(localStorage.getItem('registros')) || [];
const setRegistrosBD = () => localStorage.setItem('registros', JSON.stringify(registros));

btnSalvar.addEventListener('click', e => {
    e.preventDefault();
    saveRegistro();
});

loadRegistros();