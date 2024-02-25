document.addEventListener("DOMContentLoaded", function () {
  fetch("/members/names")
    .then((response) => response.json())
    .then((data) => {
      const namesContainer = document.getElementById("members");

      data.forEach(({ first_name, last_name }) => {
        const nameElement = document.createElement("p");
        nameElement.textContent = `${first_name} ${last_name}`;
        namesContainer.appendChild(nameElement);
      });
    })
    .catch((error) => console.error("Error:", error));
});
