const baseurl = 'http://localhost:5555/database';
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('resetButton').addEventListener('click', function () { update_table() });
    document.getElementById('tableLoadingSpinner').remove();
    update_table();
});
function update_table() {
    fetch(baseurl + '/gettable')
        .then(response => {
            if (response.status === 404) {
                document.getElementById('tableContainer').innerHTML = 'No Users In Table';
                return response.text();
            }
            else {
                return response.json();
            }
        })
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
            const col5 = document.createElement('th');
            col1.textContent = 'ID';
            headerRow.appendChild(col1);
            col2.textContent = 'Name';
            headerRow.appendChild(col2);
            col3.textContent = 'Points';
            headerRow.appendChild(col3);
            headerRow.appendChild(col4);
            headerRow.appendChild(col5);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body
            const tbody = document.createElement('tbody');
            
            data.forEach(item => {
                const row = document.createElement('tr');
                row.id = item[0];
                Object.values(item).forEach(value => {
                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);
                });
                const buttons = document.createElement('td');
                buttons.innerHTML = [
                    `<button type="button" class="btn btn-primary btn-sm" id="editButton${item[0]}" data-item-id="${item[0]}" data-action="edit">Edit</button>`,
                    `<button type="button" class="btn btn-danger btn-sm" style="margin-left:5px" id="deleteButton${item[0]}" data-item-id="${item[0]}" data-action="delete">Delete</button>`
                ].join('');
                row.appendChild(buttons);
                const msg = document.createElement('td');
                msg.innerHTML = '';
                row.appendChild(msg);
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
                    console.log(buttonType);
                    const itemId = target.getAttribute('data-item-id');
                    if (buttonType === 'edit') {
                        editUser(itemId);
                    } else if (buttonType === 'delete') {
                        deleteUser(itemId);
                    } else {
                        saveUser(itemId)
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
    window.location.reload();
};

function editUser(id) {
    row = document.getElementById(id);
    username = row.cells[1].innerHTML;
    pts = row.cells[2].innerHTML;
    row.cells[0].innerHTML = `<input type="text" style="width:50px" name="idfield" id="idfield_edit_${id}" value="${id}">`;
    row.cells[1].innerHTML = `<input type="text" style="width:250px" name="namefield" id="namefield_edit_${id}" value="${username}">`;
    row.cells[2].innerHTML = `<input type="text" style="width:50px" name="ptsfield" id="ptsfield_edit_${id}" value="${pts}">`;
    row.cells[3].innerHTML = `<button type="button" class="btn btn-primary btn-sm" id="saveButton${id}" data-item-id="${id}" data-action="save">Save</button>`;
};

function saveUser(id) {
    const row = document.getElementById(id);
    const data = {};
    data['originalID'] = id;
    data['id'] = document.getElementById(`idfield_edit_${id}`).value;
    data['name'] = document.getElementById(`namefield_edit_${id}`).value;
    data['pts'] = document.getElementById(`ptsfield_edit_${id}`).value;
    idexists = false;
    if (data['id'] == '') {
        row.cells[4].innerHTML = 'Error Empty ID Field';
        row.cells[4].style.color = 'red';
    } else if (data['name'].trim() == '') {
        row.cells[4].innerHTML = 'Error Empty Name Field';
        row.cells[4].style.color = 'red';
    } else if (data['pts'] == '') {
        row.cells[4].innerHTML = 'Error Empty Points Field';
        row.cells[4].style.color = 'red';
    } else {
        if (id === data['id']) {
            fetch(baseurl + '/edituser/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status === 200) {
                        row.cells[4].innerHTML = 'Succesfully edited user';
                        row.cells[4].style.color = 'green';
                        row.cells[0].innerHTML = [id];
                        row.cells[1].innerHTML = [data['name']];
                        row.cells[2].innerHTML = [data['pts']];
                        row.cells[3].innerHTML = [`<button type="button" class="btn btn-primary btn-sm" id="editButton${id}" data-item-id="${id}" data-action="edit">Edit</button>`,
                        `<button type="button" class="btn btn-danger btn-sm" style="margin-left:5px" id="deleteButton${id}" data-item-id="${id}" data-action="delete">Delete</button>`]
                        return response.text();
                    }
                    else {
                        return response.text().then(text => {
                            throw new Error(text)
                        })
                    }
                })
                .then(data => console.log(data))
                .catch(error => {
                    console.error('Error:', error);
                    row.cells[4].innerHTML = 'Error editing user'
                    row.cells[4].style.color = 'red';
                });

        } else {
            fetch(baseurl + '/getuserid/' + data['id'])
                .then(response => {
                    if (response.ok) {
                        idexists = true;
                        return response.json();
                    } else {
                        return response.json();
                    }
                })
                .then(data => console.log(data))
                .catch(error => console.error(error));
            if (idexists) {
                row.cells[4].innerHTML = 'Error can\'t set id, user with id already exists';
                row.cells[4].style.color = 'red';
            } else {
                fetch(baseurl + '/edituser/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => {
                        console.error('Error:', error);
                        row.cells[4].innerHTML = 'Error editing user'
                        row.cells[4].style.color = 'red';
                    });
                window.location.reload();
            }
        }
    }
};

