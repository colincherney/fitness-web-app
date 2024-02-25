document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch and display members' names
  const fetchAndDisplayMembersNames = () => {
    fetch("/members")
      .then((response) => response.json())
      .then((data) => {
        const namesContainer = document.getElementById("members");
        namesContainer.innerHTML = ""; // Clear previous names

        data.forEach(({ first_name, last_name }) => {
          const nameElement = document.createElement("p");
          nameElement.textContent = `${first_name} ${last_name}`;
          namesContainer.appendChild(nameElement);
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  // Fetch and display members' names on page load
  fetchAndDisplayMembersNames();

  fetch("/check_member")
    .then((response) => response.json())
    .then((data) => {
      const button = document.getElementById("join");
      if (data.exists) {
        console.log("User exists in members table");
        button.style.backgroundColor = "red";
        button.innerText = "Leave Club";
        button.id = "leave";

        // Define the event listener for the "leave" button
        const leaveClickListener = function (event) {
          event.stopPropagation(); // Prevent event from bubbling up and triggering other handlers

          fetch("/remove_member", {
            method: "POST",
            credentials: "same-origin", // Send cookies (session ID) with the request
          })
            .then((response) => {
              if (response.ok) {
                window.location.reload(); // Refresh the page
                console.log("Member removed successfully");
                // Optionally, you can update the button's color and text here
              } else {
                console.error("Failed to remove member");
              }
            })
            .catch((error) => console.error("Error:", error));
        };

        // Add event listener for the "leave" button
        button.addEventListener("click", leaveClickListener);
      } else {
        console.log("User does not exist in members table");
        button.id = "join1";

        // Add event listener for the "join" button
        button.addEventListener("click", function () {
          fetch("/add_member", {
            method: "POST",
            credentials: "same-origin", // Send cookies (session ID) with the request
          })
            .then((response) => {
              if (response.ok) {
                window.location.reload(); // Refresh the page
                console.log("Member added successfully");
                // Optionally, you can update the button's color and text here
              } else {
                console.error("Failed to add member");
              }
            })
            .catch((error) => console.error("Error:", error));
        });
      }
    })
    .catch((error) => console.error("Error:", error));
});
