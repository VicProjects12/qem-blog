const API = "http://localhost:5000/api";

// Read post ID from URL
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// If no ID in URL — go back to homepage
if (!postId) {
  window.location.href = "index.html";
}

// Update navbar based on login state
function updateNavbar() {
  const user = getUser();
  const nav = document.getElementById("navLinks");
  if (user) {
    nav.innerHTML = `
      <a href="dashboard.html">Dashboard</a>
      <a href="create.html">New Post</a>
      <button class="btn-secondary" onclick="logout()">Logout</button>
    `;
  }
}

// Fetch and render the post
async function loadPost() {
  try {
    const response = await fetch(`${API}/posts/${postId}`);

    if (!response.ok) {
      document.getElementById("postContent").innerHTML =
        '<p class="empty">Post not found.</p>';
      return;
    }

    const post = await response.json();

    document.getElementById("postContent").innerHTML = `
      <span class="category">${post.category}</span>
      <h1 style="margin: 12px 0 8px">${post.title}</h1>
      <p class="post-meta">
        By ${post.author.name} &nbsp;|&nbsp;
        ${new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div class='post-body' id='postBody'></div>
    `;
    document.getElementById("postBody").innerHTML = post.body;

    // Show edit/delete only if logged-in user is the author
    const user = getUser();
    if (user && user.id === post.authorId) {
      document.getElementById("ownerActions").classList.remove("hidden");
      document.getElementById("editBtn").href = `create.html?id=${post.id}`;
    }
  } catch (error) {
    document.getElementById("postContent").innerHTML =
      '<p class="empty">Could not load post. Is the server running?</p>';
  }
}

// Delete button
document.getElementById("deleteBtn").addEventListener("click", async () => {
  if (!confirm("Delete this post? This cannot be undone.")) return;

  try {
    const response = await authFetch(`${API}/posts/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.href = "index.html";
    } else {
      alert("Could not delete post.");
    }
  } catch (error) {
    alert("Something went wrong.");
  }
});

// Init
updateNavbar();
loadPost();
