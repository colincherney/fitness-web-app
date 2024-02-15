fetch(`/user`, {
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
    console.log("User ID:", data[0].user_id);
    // Use the user_id as needed in your JavaScript code
  })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });

// Logout route
document.getElementById("logout").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default behavior of the anchor tag (i.e., navigating to a new page)

  fetch("/logout", {
    method: "GET",
    credentials: "same-origin", // Include cookies in the request
  })
    .then((response) => {
      if (response.redirected) {
        // Redirect to the login page
        window.location.href = response.url;
      }
    })
    .catch((error) => {
      console.error("Error logging out:", error);
      // Handle error
    });
});
