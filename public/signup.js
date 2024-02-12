document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);

  // Serialize form data into JSON
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  const jsonString = JSON.stringify(jsonData);

  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonString,
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data); // Display the response from the server
      // Redirect to index.html if signup is successful
      if (data === "Sign up successful") {
        window.location.href = "/index.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors here
    });
});
