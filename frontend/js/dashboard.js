requireAuth();

const API = "http://localhost:5000/api";
const user = getUser();

// Welcome message
if (user) {
  document.getElementById("welcomeMsg").textContent =
    `Welcome back, ${user.name}`;
}

// Load user's posts
async function loadMyPosts() {
  const container = document.getElementById("myPostsContainer");

  try {
    const response = await authFetch(`${API}/posts/my`);
    const data = await response.json();

    if (data.posts.length === 0) {
      container.innerHTML = `
        <div class='empty'>
          <p>You have not written any posts yet.</p>
          <a href='create.html' class='btn-primary'
             style='display:inline-block; margin-top:16px; width:auto; padding:10px 24px;'>
            Write your first post
          </a>
        </div>`;
      return;
    }

    container.innerHTML = data.posts
      .map(
        (post) => `
      <div class="dashboard-card" id="card-${post.id}">
        <div class="post-info">
          <h3>${post.title}</h3>
          <p>${new Date(post.createdAt).toLocaleDateString()} &nbsp;|&nbsp; ${post.category}</p>
        </div>
        <div class="card-actions">
          <a href="post.html?id=${post.id}" class="btn-secondary">View</a>
          <a href="create.html?id=${post.id}" class="btn-secondary">Edit</a>
          <button class="btn-danger" onclick="deletePost(${post.id})">Delete</button>
        </div>
      </div>
    `,
      )
      .join("");
  } catch (error) {
    container.innerHTML =
      '<p class="empty">Could not load posts. Is the server running?</p>';
  }
}

// Delete without page reload
async function deletePost(postId) {
  if (!confirm("Delete this post? This cannot be undone.")) return;

  try {
    const response = await authFetch(`${API}/posts/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.getElementById(`card-${postId}`).remove();
    } else {
      alert("Could not delete post.");
    }
  } catch (error) {
    alert("Something went wrong.");
  }
}

// Init
loadMyPosts();
