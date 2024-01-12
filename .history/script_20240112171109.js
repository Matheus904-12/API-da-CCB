document.addEventListener('DOMContentLoaded', function () {
    const registroForm = document.getElementById('registroForm');
    const registrosContainer = document.getElementById('registrosContainer');
    const versiculosChart = document.getElementById('versiculosChart').getContext('2d');
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
      exibirGrafico();
      limparFormulario();
    });
  
    function exibirRegistros() {
      registrosContainer.innerHTML = '';
  
      registros.forEach((registro, index) => {
        const registroDiv = document.createElement('div');
        registroDiv.classList.add('registro-item');
  
        registroDiv.innerHTML = `
          <p><strong>Nome:</strong> ${registro.nome}</p>
          <p><strong>Livro:</strong> ${registro.livro}</p>
          <p><strong>Data:</strong> ${registro.data}</p>
          <button onclick="editarRegistro(${index})">Editar</button>
          <button onclick="apagarRegistro(${index})">Apagar</button>
        `;
  
        registrosContainer.appendChild(registroDiv);
      });
    }
  
    function exibirGrafico() {
      const versiculosPorRegistro = registros.map(registro => registro.versiculo);
      const cores = gerarCoresAleatorias(registros.length);
  
      const versiculosChartConfig = {
        type: 'doughnut',
        data: {
          labels: Array.from({ length: versiculosPorRegistro.length }, (_, i) => `Registro ${i + 1}`),
          datasets: [{
            data: versiculosPorRegistro,
            backgroundColor: cores,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
  
      // Remova o gráfico anterior antes de criar um novo
      if (window.versiculosDoughnutChart) {
        window.versiculosDoughnutChart.destroy();
      }
  
      window.versiculosDoughnutChart = new Chart(versiculosChart, versiculosChartConfig);
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
      exibirGrafico();
    }
  
    function gerarCoresAleatorias(quantidade) {
      const cores = [];
  
      for (let i = 0; i < quantidade; i++) {
        const cor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        cores.push(cor);
      }
  
      return cores;
    }
  });
  