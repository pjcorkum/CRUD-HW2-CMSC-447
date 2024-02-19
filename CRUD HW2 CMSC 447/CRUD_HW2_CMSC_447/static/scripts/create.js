document.addEventListener('DOMContentLoaded', function () {
    const baseurl = 'http://localhost:5555/database';
    const dropResultPlaceholder = document.getElementById('addResultPlaceholder');
    document.getElementById('createEntryButton').addEventListener('click', function () {
        const data = {};
        data['id'] = document.getElementById('idfield_create').value;
        data['name'] = document.getElementById('namefield_create').value;
        data['pts'] = document.getElementById('pointsfield_create').value;

        fetch(baseurl + '/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status === 422) {
                    return response.text().then(text => {
                        throw new Error(text);
                    })
                }
                return response.text()
            })
            .then(data => {
                console.log(data);
                dropResultPlaceholder.innerHTML = data;
                dropResultPlaceholder.style.color = 'green';
            })
            .catch(error => {
                console.error('Error:', error);
                dropResultPlaceholder.innerHTML = error;
                dropResultPlaceholder.style.color = 'red';
            });
    });
});