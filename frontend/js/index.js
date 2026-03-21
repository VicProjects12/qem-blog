const API = "https://qem-blog-production.up.railway.app/api";
let currentPage = 1;
let currentSearch = "";

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

// Fetch and render posts
async function loadPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = '<p class="loading">Loading...</p>';

  const url = `${API}/posts?page=${currentPage}&limit=9&search=${currentSearch}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.posts.length === 0) {
      container.innerHTML = '<p class="empty">No posts found.</p>';
      updatePagination({ page: 1, totalPages: 1 });
      return;
    }

    container.innerHTML = data.posts
      .map(
        (post) => `
      <div class="post-card" onclick="location.href='post.html?id=${post.id}'">
        <span class="category">${post.category}</span>
        <h2>${post.title}</h2>
        <p>${post.body.replace(/<[^>]*>/g, "").substring(0, 120)}${post.body.replace(/<[^>]*>/g, "").length > 120 ? "..." : ""}</p>
        <div class="meta">By ${post.author.name}</div>
      </div>
    `,
      )
      .join("");

    updatePagination(data.pagination);
  } catch (error) {
    container.innerHTML =
      '<p class="empty">Could not load posts. Is the server running?</p>';
  }
}

// Update pagination controls
function updatePagination({ page, totalPages }) {
  document.getElementById("pageInfo").textContent =
    `Page ${page} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = page <= 1;
  document.getElementById("nextBtn").disabled = page >= totalPages;
}

// Pagination listeners
document.getElementById("prevBtn").addEventListener("click", () => {
  currentPage--;
  loadPosts();
});
document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  loadPosts();
});

// Search listener
document.getElementById("searchInput").addEventListener("input", (e) => {
  currentSearch = e.target.value;
  currentPage = 1;
  loadPosts();
});

// Init
updateNavbar();
loadPosts();
