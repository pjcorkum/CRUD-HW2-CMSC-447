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
                if (data.success) {
                    alert = document.getElementById('succesfulDropAlert');
                    alert.classList.remove('invisible');
                    print("success");
                } else {
                    alert = document.getElementById('failedDropAlert');
                    alert.classlist.remove('invisible');
                }
            })
            .catch(error => console.error('Error:', error));
    });
});