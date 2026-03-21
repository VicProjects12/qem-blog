requireAuth();

const API = "https://qem-blog-production.up.railway.app/api";

// Initialise Quill editor
const quill = new Quill("#editor", {
  theme: "snow",
  placeholder: "Write your post...",
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
      ["image"],
      ["clean"],
    ],
  },
});

// Detect mode
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const isEditMode = !!postId;

// Update page for edit mode
if (isEditMode) {
  document.getElementById("pageTitle").textContent = "Edit Post";
  document.getElementById("pageSubtitle").textContent = "Update your post";
  document.getElementById("submitBtn").textContent = "Save Changes";
  loadExistingPost();
}

// Pre-fill form in edit mode
async function loadExistingPost() {
  try {
    const response = await fetch(`${API}/posts/${postId}`);
    const post = await response.json();

    document.getElementById("title").value = post.title;
    document.getElementById("category").value = post.category;

    // Load existing HTML content into Quill
    quill.root.innerHTML = post.body;
  } catch (error) {
    showError("Could not load post for editing.");
  }
}

// Submit handler
document.getElementById("submitBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;

  // Get HTML content from Quill
  const body = quill.root.innerHTML;

  // Check if editor is empty
  const isEmpty = quill.getText().trim().length === 0;

  hideMessages();

  if (!title || isEmpty) {
    showError("Title and body are required.");
    return;
  }

  const url = isEditMode ? `${API}/posts/${postId}` : `${API}/posts`;
  const method = isEditMode ? "PUT" : "POST";

  try {
    const response = await authFetch(url, {
      method,
      body: JSON.stringify({ title, body, category }),
    });

    const data = await response.json();

    if (!response.ok) {
      showError(data.message);
      return;
    }

    window.location.href = `post.html?id=${data.post.id}`;
  } catch (error) {
    showError("Something went wrong. Is the server running?");
  }
});

function showError(msg) {
  const el = document.getElementById("errorMsg");
  el.textContent = msg;
  el.classList.remove("hidden");
}

function hideMessages() {
  document.getElementById("errorMsg").classList.add("hidden");
  document.getElementById("successMsg").classList.add("hidden");
}
