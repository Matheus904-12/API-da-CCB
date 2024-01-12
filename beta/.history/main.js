function registerVerse() {
    const gender2 = $('#gender2')
    const name = $('#name').val();
    const date = $('#date').val();
    const chapter = $('#chapter').val();
    const verse = $('#verse').val();
    const gender = $('#gender').val();

    // Validando se todos os campos foram preenchidos
    if (!gender2 || !name || !date || !chapter || !verse || !gender) {
        alert('Por favor, preencha todos os campos antes de registrar.');
        return;
    }

    // Adicionando o novo registro à lista
    const newRecord = {
        gender2,
        name,
        date,
        chapter,
        verse,
        gender
    };

    records.push(newRecord);

    // Atualizando a lista de registros no record-container
    updateRecordList();

    // Limpar os campos do formulário após o registro
    $('#name, #date, #chapter, #verse, #gender').val('');

    alert('Versículo registrado com sucesso!');
}

function updateRecordList() {
    // Limpar a lista atual antes de atualizar
    $('#record-list').empty();

    // Organizando os registros por mês
    const recordsByMonth = groupRecordsByMonth(records);

    // Adicionando os registros ao record-container
    for (const month in recordsByMonth) {
        const monthRecords = recordsByMonth[month];
        const monthCount = monthRecords.length;

        // Adicionando um botão para mostrar os registros do mês
        const monthButton = $('<button>')
            .text(`${month} (${monthCount})`)
            .click(function () {
                showRecords(monthRecords);
            });

        $('#record-list').append(monthButton);
    }
}

function groupRecordsByMonth(records) {
    // Organizando os registros por mês
    const recordsByMonth = {};

    records.forEach(record => {
        const recordDate = new Date(record.date);
        const monthKey = `${recordDate.getFullYear()}-${recordDate.getMonth() + 1}`;

        if (!recordsByMonth[monthKey]) {
            recordsByMonth[monthKey] = [];
        }

        recordsByMonth[monthKey].push(record);
    });

    return recordsByMonth;
}

function showRecords(records) {
    // Limpar os registros anteriores antes de mostrar novos
    $('#record-details').empty();

    // Adicionando os registros ao record-container
    records.forEach(record => {
        const recordDetails = `
            <li>
                <strong>Data:</strong> ${record.date} |
                <strong>Nome:</strong> ${record.name} |
                <strong>Auxiliar:</strong> ${record.gender} |
                <strong>Livro e Capítulo:</strong> ${record.chapter} |
                <strong>Versículo:</strong> ${record.verse}
            </li>
        `;
        $('#record-details').append(recordDetails);
    });
}
