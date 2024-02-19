document.addEventListener('DOMContentLoaded', function () {
    const baseurl = 'http://localhost:5555/database';
    fetch(baseurl + '/createdb',{
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching data:', error));
    document.getElementById('resetButton').addEventListener('click', function () {
        dropConfirmation('Are you sure you would like to delete all data?','warning')
    });
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" id="succesfullyDroppedAlert" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" id="closeAlertButton" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.appendChild(wrapper);
        document.getElementById('closeAlertButton').addEventListener('click', function () {
            document.getElementById('succesfullyDroppedAlert').remove();
        })
    }
    const dropConfirmation = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" id="confirmDeletionAlert" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn btn-secondary" id="confirmDeleteButton">Confirm</button>',
            '   <button type="button" class="btn btn-primary" id="cancelDeleteButton">Cancel</button>',
            '</div>'
        ].join('');
        alertPlaceholder.appendChild(wrapper);
        document.getElementById('cancelDeleteButton').addEventListener('click', function () {
            document.getElementById('confirmDeletionAlert').remove();
        });
        document.getElementById('confirmDeleteButton').addEventListener('click', function () {
            document.getElementById('confirmDeletionAlert').remove();
            fetch(baseurl + '/droptable', {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            const tableContainer = document.getElementById('tableContainer');
            if (tableContainer) {
                tableContainer.innerHTML = '';
            };
            appendAlert('Table succesfully dropped!', 'success')
        });
    }
});
