document.addEventListener('DOMContentLoaded', function () {
    const baseurl = 'http://localhost:5555/database';
    document.getElementById('searchIDButton').addEventListener('click', function () {
        fetch(baseurl + '/getuserid/' + document.getElementById('idfield_search').value)
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
                col1.textContent = 'ID';
                headerRow.appendChild(col1);
                col2.textContent = 'Name';
                headerRow.appendChild(col2);
                col3.textContent = 'Points';
                headerRow.appendChild(col3);
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
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);

                const tableContainer = document.getElementById('tableContainer');
                tableContainer.innerHTML = '';
                tableContainer.appendChild(table);
                document.getElementById('resultsLabel').innerHTML = 'Result';
            })
            .catch(error => {
                console.error('Error fetching table:', error)
                document.getElementById('resultsLabel').innerHTML = 'No Results Found';
                document.getElementById('tableContainer').innerHTML = '';
            });
    });
});