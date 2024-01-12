document.addEventListener('DOMContentLoaded', function () {
    const registroForm = document.getElementById('registroForm');
    const searchInput = document.getElementById('searchInput');
    const registrosContainer = document.getElementById('registrosContainer');
    let registros = [];
  
    registroForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const auxiliar = document.getElementById('gender').value;
      const nome = document.getElementById('m-nome').value;
      const livro = document.getElementById('m-livro').value;
      const capitulo = document.getElementById('m-capitulo').value;
      const versiculo = document.getElementById('m-versiculo').value;
      const data = document.getElementById('m-date').value;
  
      const novoRegistro = {
        auxiliar,
        nome,
        livro,
        capitulo,
        versiculo,
        data,
      };
  
      registros.push(novoRegistro);
      exibirRegistros();
      limparFormulario();
    });
  
    searchInput.addEventListener('input', function () {
      const termoPesquisa = searchInput.value.toLowerCase();
      const resultadosFiltrados = registros.filter(registro =>
        registro.nome.toLowerCase().includes(termoPesquisa)
      );
  
      exibirRegistros(resultadosFiltrados);
    });
  
    function exibirRegistros(registrosFiltrados = registros) {
      registrosContainer.innerHTML = '';
  
      registrosFiltrados.forEach((registro, index) => {
        const registroDiv = document.createElement('div');
        registroDiv.classList.add('registro-item');
  
        registroDiv.innerHTML = `
          <p><strong>Auxiliar:</strong> ${registro.auxiliar}</p>
          <p><strong>Nome:</strong> ${registro.nome}</p>
          <p><strong>Livro:</strong> ${registro.livro}</p>
          <p><strong>Capítulo:</strong> ${registro.capitulo}</p>
          <p><strong>Versículo:</strong> ${registro.versiculo}</p>
          <p><strong>Data:</strong> ${registro.data}</p>
          <button onclick="editarRegistro(${index})">Editar</button>
          <button onclick="apagarRegistro(${index})">Apagar</button>
        `;
  
        registrosContainer.appendChild(registroDiv);
      });
    }
  
    function limparFormulario() {
      registroForm.reset();
    }
  
    function editarRegistro(index) {
      // Implemente a lógica de edição aqui
      // Pode abrir um modal com o mesmo formulário preenchido e adicionar um botão "Salvar Edição"
    }
  
    function apagarRegistro(index) {
      registros.splice(index, 1);
      exibirRegistros();
    }
  });
  