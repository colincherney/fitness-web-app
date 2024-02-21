
//Populate past exercises table
document.addEventListener("DOMContentLoaded", () => {
  fetch(`/workouts`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("User Data:", data);
      data.forEach(workout => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const categoryCell = document.createElement('td');
        const weightCell = document.createElement('td');
        const repsCell = document.createElement('td');
        const dateCell = document.createElement('td');

        nameCell.textContent = workout.exercise_name;
        categoryCell.textContent = workout.category;
        weightCell.textContent = workout.weight;
        repsCell.textContent = workout.reps;
        dateCell.textContent = workout.date;


        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(weightCell);
        row.appendChild(repsCell);
        row.appendChild(dateCell);
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
});