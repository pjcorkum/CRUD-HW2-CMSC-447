document.addEventListener('DOMContentLoaded', function () {
    const baseurl = 'http://localhost:5555/database';
    document.getElementById('createEntryButton').addEventListener('click', function () {
        const data = {};
        data['id'] = document.getElementById('idfield_create').value;
        data['name'] = document.getElementById('namefield_create').value;
        data['pts'] = document.getElementById('pointsfield_create').value;

        fetch(baseurl + '/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    });
});