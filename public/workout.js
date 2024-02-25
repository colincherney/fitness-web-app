function exercises() {
  fetch("/workouts")
    .then((response) => response.json())
    .then((data) => {
      const exerciseTable = document.getElementById("exerciseTable");
      const tbody = exerciseTable.querySelector("tbody");

      data.forEach((exercise) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const categoryCell = document.createElement("td");
        const weightCell = document.createElement("td");
        const repsCell = document.createElement("td");
        const dateCell = document.createElement("td");

        nameCell.textContent = exercise.exercise_name;
        categoryCell.textContent = exercise.category;
        weightCell.textContent = exercise.weight;
        repsCell.textContent = exercise.reps;
        dateCell.textContent = exercise.date;

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(weightCell);
        row.appendChild(repsCell);
        row.appendChild(dateCell);
        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching exercise data:", error);
    });
}

exercises();
