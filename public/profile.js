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

    document.getElementById("username").innerText =
      data[0].first_name + " " + data[0].last_name;

    document.getElementById("user-bio").innerText = data[0].user_bio;
    
    document.getElementById("user_photo").src = data[0].pfp_url;

  })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });
