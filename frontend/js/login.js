redirectIfLoggedIn();

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.classList.add("hidden");

  if (!email || !password) {
    errorMsg.textContent = "Please fill in all fields";
    errorMsg.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message;
      errorMsg.classList.remove("hidden");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  } catch (error) {
    errorMsg.textContent = "Could not connect to server.";
    errorMsg.classList.remove("hidden");
  }
});
