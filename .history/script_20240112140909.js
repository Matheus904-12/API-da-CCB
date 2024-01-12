document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const btnSave = document.getElementById('btnSalvar');
    const form = document.querySelector('form');
    const tableBody = document.querySelector('.divTable tbody');

    async function fetchItems() {
      const response = await fetch('http://localhost:3000/items');
      const items = await response.json();

      tableBody.innerHTML = '';

      items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.livro}</td>
          <td>${new Date(item.data).toLocaleDateString()}</td>
          <td class="acao"><button onclick="editItem('${item._id}')">Editar</button></td>
          <td class="acao"><button onclick="deleteItem('${item._id}')">Excluir</button></td>
        `;
        tableBody.appendChild(row);
      });
    }

    async function addItem() {
      const nome = document.getElementById('m-nome').value;
      const livro = document.getElementById('m-livro').value;
      const data = document.getElementById('m-date').value;

      await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, livro, data }),
      });

      fetchItems();
      closeModal();
    }

    async function editItem(id) {
      const response = await fetch(`http://localhost:3000/items/${id}`);
      const item = await response.json();

      document.getElementById('m-nome').value = item.nome;
      document.getElementById('m-livro').value = item.livro;
      document.getElementById('m-date').value = item.data.slice(0, 10);

      btnSave.onclick = async () => {
        await fetch(`http://localhost:3000/items/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: document.getElementById('m-nome').value,
            livro: document.getElementById('m-livro').value,
            data: document.getElementById('m-date').value,
          }),
        });

        fetchItems();
        closeModal();
      };

      openModal();
    }

    async function deleteItem(id) {
      await fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
      });

      fetchItems();
    }

    function openModal() {
      modal.style.display = 'flex';
    }

    function closeModal() {
      modal.style.display = 'none';
      form.reset();
    }

    btnSave.onclick = addItem;
    fetchItems();
  });