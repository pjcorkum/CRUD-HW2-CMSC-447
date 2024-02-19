const baseurl = 'http://localhost:5555/database';
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('resetButton').addEventListener('click', function () { update_table() });
    document.getElementById('tableLoadingSpinner').remove();
    update_table();
});
function update_table() {
    fetch(baseurl + '/gettable')
        .then(response => response.json())
        .then(data => {
            // Assuming 'data' is an array of objects
            const table = document.createElement('table');
            table.className = 'table table-striped'; // Bootstrap class names for styling

            // Create table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const col1 = document.createElement('th');
            const col2 = document.createElement('th');
            const col3 = document.createElement('th');
            const col4 = document.createElement('th');
            col1.textContent = 'ID';
            headerRow.appendChild(col1);
            col2.textContent = 'Name';
            headerRow.appendChild(col2);
            col3.textContent = 'Points';
            headerRow.appendChild(col3);
            headerRow.appendChild(col4);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body
            const tbody = document.createElement('tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                Object.values(item).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);
                });
                const buttons = document.createElement('td')
                buttons.innerHTML = [
                    `<button type="button" class="btn btn-primary btn-sm" id="editButton${item[0]}" data-item-id="${item[0]} data-action="delete">Edit</button>`,
                    `<button type="button" class="btn btn-danger btn-sm" style="margin-left:5px" id="deleteButton${item[0]}" data-item-id="${item[0]}" data-action="delete">Delete</button>`
                ].join('');
                row.appendChild(buttons);
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            const tableContainer = document.getElementById('tableContainer');
            tableContainer.innerHTML = '';
            tableContainer.appendChild(table);
            tbody.addEventListener('click', function (event) {
                const target = event.target;
                if (target.tagName === 'BUTTON') {
                    const buttonType = target.getAttribute('data-action');
                    const itemId = target.getAttribute('data-item-id');
                    if (buttonType === 'edit') {

                    } else {
                        deleteUser(itemId)
                    }
                };
            });
        })
        .catch(error => console.error('Error fetching table:', error));
    
};

function deleteUser(id) {
    fetch(baseurl + '/deleteuserid/' + id, {
        method: 'POST'
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    update_table();
};

function editUser(id) {

};


