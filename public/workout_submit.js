document.addEventListener("DOMContentLoaded", () => {
    fetch(`/exercises`, {
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
        data.forEach(exercise => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          const categoryCell = document.createElement('td');

          nameCell.textContent = exercise.exercise_name;
          categoryCell.textContent = exercise.category;

          row.appendChild(nameCell);
          row.appendChild(categoryCell);
          tableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  });
  