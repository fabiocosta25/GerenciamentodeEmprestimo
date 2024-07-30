const loans = JSON.parse(localStorage.getItem('loans')) || [];

function updateImage() {
    const material = document.getElementById('material').value;
    const image = document.getElementById('materialImage');
    const kitOptions = document.getElementById('kitOptions');
    const kitContainer = document.getElementById('kitContainer');

    if (material.startsWith('MOJO')) {
        image.src = `assets/logo/mojo.jpg`;
        kitOptions.innerHTML = `
            <div><input type="checkbox" id="mojoCamera" name="mojoCamera" value="Camera"><label for="mojoCamera"> Camera</label></div>
            <div><input type="checkbox" id="mojoTripod" name="mojoTripod" value="Tripod"><label for="mojoTripod"> Tripod</label></div>
            <div><input type="checkbox" id="mojoMicrophone" name="mojoMicrophone" value="Microphone"><label for="mojoMicrophone"> Microphone</label></div>
        `;
    } else if (material.startsWith('KIT ALPHA')) {
        image.src = `assets/logo/Alpha.jpg`;
        kitOptions.innerHTML = `
            <div><input type="checkbox" id="alphaCamera" name="alphaCamera" value="Camera"><label for="alphaCamera"> Camera</label></div>
            <div><input type="checkbox" id="alphaTripod" name="alphaTripod" value="Tripod"><label for="alphaTripod"> Tripod</label></div>
            <div><input type="checkbox" id="alphaMicrophone" name="alphaMicrophone" value="Microphone"><label for="alphaMicrophone"> Microphone</label></div>
        `;
    } else if (material.startsWith('KIT GO PRO')) {
        image.src = `assets/logo/go pro.jpg`;
        kitOptions.innerHTML = `
            <div><input type="checkbox" id="goPro" name="goPro" value="GoPro"><label for="goPro"> GoPro</label></div>
            <div><input type="checkbox" id="suporteCabeca" name="suporteCabeca" value="Suporte de cabeça"><label for="suporteCabeca"> Suporte de cabeça</label></div>
            <div><input type="checkbox" id="bateriaExtra" name="bateriaExtra" value="Bateria extra"><label for="bateriaExtra"> Bateria extra</label></div>
            <div><input type="checkbox" id="cartaoMemoria" name="cartaoMemoria" value="Cartão de memória"><label for="cartaoMemoria"> Cartão de memória</label></div>
        `;
    } else {
        image.src = '';
        kitOptions.innerHTML = '';
    }

    kitContainer.style.display = material ? 'flex' : 'none';
}

document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const material = document.getElementById('material').value;
    const dateTime = document.getElementById('dateTime').value;
    const technician = document.getElementById('technician').value;

    const items = Array.from(document.querySelectorAll('#kitOptions input:checked')).map(item => item.value);

    const loan = {
        name,
        material,
        dateTime,
        technician,
        items
    };

    loans.push(loan);
    localStorage.setItem('loans', JSON.stringify(loans));

    document.getElementById('loanForm').reset();
    document.getElementById('kitContainer').style.display = 'none';

    populateLoanTable();
});

function populateLoanTable() {
    const tableBody = document.getElementById('loanTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    loans.forEach((loan) => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = loan.name;
        newRow.insertCell(1).textContent = loan.material;
        newRow.insertCell(2).textContent = loan.dateTime;
        newRow.insertCell(3).textContent = loan.technician;
        newRow.insertCell(4).textContent = loan.items.join(', ');
    });
}

document.addEventListener('DOMContentLoaded', populateLoanTable);
