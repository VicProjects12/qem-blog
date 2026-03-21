redirectIfLoggedIn();

document.getElementById("registerBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.classList.add("hidden");

  if (!name || !email || !password) {
    errorMsg.textContent = "Please fill in all fields";
    errorMsg.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch(
      "https://qem-blog-production.up.railway.app/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message;
      errorMsg.classList.remove("hidden");
      return;
    }

    window.location.href = "login.html";
  } catch (error) {
    errorMsg.textContent = "Could not connect to server.";
    errorMsg.classList.remove("hidden");
  }
});
