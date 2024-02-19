document.addEventListener('DOMContentLoaded', function () {
    const baseurl = 'http://localhost:5555/database';
    fetch(baseurl + '/createdb',{
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching data:', error));
    document.getElementById('resetButton').addEventListener('click', function () {
        fetch(baseurl + '/droptable', {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const alert = document.getElementById('succesfulDropAlert');
                alert.style.display.replace = 'none';
                const table = document.getElementById('tableContainer');
                if (table) {
                    table.innerHTML = '';
                }
            })
            .catch(error => console.error('Error:', error));
      
        appendAlert('Nice, you triggered this alert message!', 'success')
    });
    const alertPlaceholder = document.getElementById('succesfullyDroppedPlaceholder');
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
});
