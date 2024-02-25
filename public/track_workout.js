document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", function () {
    updateWorkout(button.value);
  });
});

function updateWorkout(exercise) {
  let reps = document.getElementById(exercise + "-reps").value;
  let weight = document.getElementById(exercise + "-weight").value;

  console.log("Exercise:", exercise);
  console.log("Reps:", reps);
  console.log("Weight:", weight);

  fetch("/workout_push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      exercise_name: exercise,
      reps: reps,
      weight: weight,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      // Handle success
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
      // Handle error
    });
}
