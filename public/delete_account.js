// this is just a base. a lot of things aren't working yet...


document.getElementById("deleteBtn").addEventListener("click", function() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  
    document.getElementById("confirmBtn").addEventListener("click", function() {
      // Get the userId of the currently logged-in user (you need to implement this)
      const userId = getUserId(); // Implement this function to get the user ID
  
      // Send AJAX request to delete account
      fetch("/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: userId })
      })
      .then(response => {
        if (response.ok) {
          // Account deleted successfully, perform any necessary actions (e.g., redirect to login page)
          alert("Account deleted successfully");
          window.location.href = "/login"; // Redirect to login page
        } else {
          // Error occurred while deleting account
          alert("Error occurred while deleting account");
        }
      })
      .catch(error => {
        console.error("Error deleting account:", error);
        alert("Error occurred while deleting account");
      });
    });
  
    document.getElementById("cancelBtn").addEventListener("click", function() {
      modal.style.display = "none";
    });
  });
  
