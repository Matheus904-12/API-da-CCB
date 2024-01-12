document.addEventListener('DOMContentLoaded', function () {
    carregarVersiculos();
});

function carregarVersiculos() {
    fetch('api.php')
        .then(response => response.json())
        .then(data => exibirVersiculos(data));
}

function exibirVersiculos(versiculos) {
    const container = document.getElementById('versiculos-container');
    container.innerHTML = '';

    versiculos.forEach(versiculo => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${versiculo.livro} ${versiculo.capitulo}:${versiculo.versiculo}</strong> - ${versiculo.nome} (${versiculo.data_culto})`;
        container.appendChild(div);
    });
}

function registrarVersiculo() {
    const livro = document.getElementById('livro').value;
    const capitulo = document.getElementById('capitulo').value;
    const versiculo = document.getElementById('versiculo').value;
    const nome = document.getElementById('nome').value;
    const auxiliar = document.getElementById('auxiliar').value;
    const data_culto = document.getElementById('data_culto').value;

    fetch('api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            livro: livro,
            capitulo: capitulo,
            versiculo: versiculo,
            nome: nome,
            auxiliar: auxiliar,
            data_culto: data_culto,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        carregarVersiculos();
    });
}
