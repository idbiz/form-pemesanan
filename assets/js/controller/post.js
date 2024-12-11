document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category");
  
    // Helper function to get cookie value by name
    function getCookieValue(name) {
      const cookie = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
      return cookie ? cookie.split('=')[1] : null;
    }
  
    const loginToken = getCookieValue("Login");
    // if (!loginToken) {
    //   console.error("Login token not found in cookies.");
    //   return;
    // }
  
    // Fetch categories and populate the select dropdown
    fetch("https://asia-southeast2-awangga.cloudfunctions.net/idbiz/design-category", {
      headers: {
        "Login": loginToken
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then(data => {
        const categories = data.data;
        categories.forEach(category => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.category;
          categorySelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  
    // Handle form submission
    const orderForm = document.getElementById("orderForm");
  
    orderForm.addEventListener("submit", event => {
      event.preventDefault(); // Prevent default form submission
  
      const formData = new FormData(orderForm);
  
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone_number: formData.get("phone_number"),
        category: formData.get("category"),
        description: formData.get("description"),
      };
  
      // If a file is uploaded, include it in the payload
      const fileInput = document.getElementById("upload_references");
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        payload.upload_references = file;
      }
  
      fetch("https://asia-southeast2-awangga.cloudfunctions.net/idbiz/insert/pemesanan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Login": loginToken
        },
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to submit order");
          }
          return response.json();
        })
        .then(data => {
          alert("Order submitted successfully! Message: " + data.message);
          orderForm.reset();
        })
        .catch(error => {
          console.error("Error submitting order:", error);
          alert("Login terlebih dahulu untuk membuat pesanan!");
        });
    });
  });