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
    console.log("User Data:", data);
    // Use the data as needed in your JavaScript code
  })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });
