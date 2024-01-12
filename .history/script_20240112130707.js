const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sAuxiliar = document.querySelector('gender');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sCapitulo = document.querySelector('#m-capitulo');
const sVersiculo = document.querySelector('#m-versiculo');
const sData = document.querySelector('#m-date');
const btnSalvar = document.querySelector('#btnSalvar');

let funcionarios;
let id;

function openModal(edit = false, index = 0) {
    modal.style.display = 'flex';

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.style.display = 'none';
        }
    };

    if (edit) {
        sAuxiliar.value = funcionarios[index].gender
        sNome.value = funcionarios[index].nome;
        sFuncao.value = funcionarios[index].funcao;
        sCapitulo.value = funcionarios[index].capitulo;
        sVersiculo.value = funcionarios[index].versicolo;
        sData.value = funcionarios[index].data;
        id = index;
    } else {
        sAuxiliar.value = '';
        sNome.value = '';
        sFuncao.value = '';
        sCapitulo.value = '';
        sVersiculo.value = '';
        sData.value = '';
    }
}

function deleteFuncionario(index) {
    funcionarios.splice(index, 1);
    setFuncionariosBD();
    loadFuncionarios();
}

function saveFuncionario() {
    if (sAuxiliar.value === '' || sNome.value === '' || sFuncao.value === '' || sCapitulo.value === '' || sVersiculo.value === '' || sData.value === '') {
        return;
    }

    if (id !== undefined) {
        funcionarios[id].nome = sNome.value;
        funcionarios[id].funcao = sFuncao.value;
        funcionarios[id].salario = sSalario.value;
    } else {
        funcionarios.push({
            'auxiliar': s
            'nome': sNome.value,
            'funcao': sFuncao.value,
            'salario': sSalario.value
        });
    }

    setFuncionariosBD();

    modal.style.display = 'none';
    loadFuncionarios();
    id = undefined;
}

function insertFuncionario(funcionario, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${funcionario.nome}</td>
        <td>${funcionario.funcao}</td>
        <td>R$ ${funcionario.salario}</td>
        <td class="acao">
            <button onclick="openModal(true, ${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteFuncionario(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}

function loadFuncionarios() {
    funcionarios = getFuncionariosBD();
    tbody.innerHTML = '';
    funcionarios.forEach((funcionario, index) => {
        insertFuncionario(funcionario, index);
    });
}

const getFuncionariosBD = () => JSON.parse(localStorage.getItem('dbfuncionarios')) || [];
const setFuncionariosBD = () => localStorage.setItem('dbfuncionarios', JSON.stringify(funcionarios));

btnSalvar.onclick = e => {
    e.preventDefault();
    saveFuncionario();
};

loadFuncionarios();
