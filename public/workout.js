function exercises() {
    fetch('/exercises')
      .then(response => response.json())
      .then(data => {
        
        const exerciseTable = document.getElementById('exerciseTable');
        const tbody = exerciseTable.querySelector('tbody');

        data.forEach(exercise => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          const categoryCell = document.createElement('td');

          nameCell.textContent = exercise.name;
          categoryCell.textContent = exercise.category;

          row.appendChild(nameCell);
          row.appendChild(categoryCell);
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching exercise data:', error);
      })
  }
  
  exercises();