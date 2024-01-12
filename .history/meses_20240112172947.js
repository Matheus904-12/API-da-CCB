document.addEventListener('DOMContentLoaded', function () {
    const mesesContainer = document.getElementById('mesesContainer');
    let registros = [];
  
    // Simulação de registros para teste
    for (let i = 0; i < 10; i++) {
      registros.push({
        nome: `Nome ${i + 1}`,
        livro: `Livro ${i + 1}`,
        data: `2022-01-${Math.floor(Math.random() * 10) + 1}`,
      });
    }
  
    exibirMeses();
  
    function exibirMeses() {
      const meses = obterMeses();
      const mesesQuantidades = calcularQuantidadesPorMes(meses);
  
      mesesContainer.innerHTML = '';
  
      meses.forEach((mes, index) => {
        const mesDiv = document.createElement('div');
        mesDiv.classList.add('mes-item');
  
        mesDiv.innerHTML = `
          <p><strong>Mês:</strong> ${mes}</p>
          <p><strong>Quantidade:</strong> ${mesesQuantidades[index]}</p>
          <button onclick="exibirRegistrosPorMes('${mes}')">Ver Registros</button>
        `;
  
        mesesContainer.appendChild(mesDiv);
      });
    }
  
    function obterMeses() {
      const mesesSet = new Set();
      registros.forEach(registro => {
        const mes = new Date(registro.data).toLocaleString('default', { month: 'long' });
        mesesSet.add(mes);
      });
  
      return Array.from(mesesSet);
    }
  
    function calcularQuantidadesPorMes(meses) {
      const quantidades = [];
      meses.forEach(mes => {
        const quantidade = registros.filter(registro =>
          new Date(registro.data).toLocaleString('default', { month: 'long' }) === mes
        ).length;
  
        quantidades.push(quantidade);
      });
  
      return quantidades;
    }
  
    function exibirRegistrosPorMes(mes) {
      const registrosPorMes = registros.filter(registro =>
        new Date(registro.data).toLocaleString('default', { month: 'long' }) === mes
      );
  
      alert(`Registros para o mês de ${mes}:\n${JSON.stringify(registrosPorMes, null, 2)}`);
    }
  
    function toggleMode() {
      const dashboardContainer = document.querySelector('.dashboard-container');
      dashboardContainer.classList.toggle('light-mode');
      dashboardContainer.classList.toggle('dark-mode');
    }
  });
  