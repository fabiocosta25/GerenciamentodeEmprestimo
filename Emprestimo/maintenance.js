const loans = JSON.parse(localStorage.getItem('loans')) || [];

function importLoans() {
    const tableBody = document.getElementById('maintenanceTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    loans.forEach((loan) => {
        const newRow = tableBody.insertRow();
        const selectCell = newRow.insertCell(0);
        const selectCheckbox = document.createElement('input');
        selectCheckbox.type = 'checkbox';
        selectCell.appendChild(selectCheckbox);

        newRow.insertCell(1).textContent = loan.name;
        newRow.insertCell(2).textContent = loan.material;
        newRow.insertCell(3).textContent = loan.dateTime;
        const dateTimeCell = newRow.insertCell(4);
        dateTimeCell.innerHTML = `<input type="datetime-local">`;
        newRow.insertCell(5).textContent = loan.technician;
        newRow.insertCell(6).textContent = loan.items.join(', ');
        newRow.insertCell(7).textContent = '';
    });
}

function approveSelected() {
    const checkboxes = document.querySelectorAll('#maintenanceTable tbody input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        row.querySelector('td:last-child').textContent = 'Aprovado';
    });
}

function denySelected() {
    const checkboxes = document.querySelectorAll('#maintenanceTable tbody input[type="checkbox"]:checked');
    const actionText = prompt('Motivo da Reprovação:');
    checkboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        row.querySelector('td:last-child').textContent = actionText;
    });
}

function downloadCSV() {
    const rows = document.querySelectorAll('#maintenanceTable tr');
    const csvContent = Array.from(rows).map(row => Array.from(row.cells).map(cell => cell.textContent).join(',')).join('\n');

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = 'maintenance_data.csv';
    link.click();
}
