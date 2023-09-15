
let isLoading = false;

const app = document.getElementById("app");
const postsList = document.getElementById("posts-list");
const urlList = document.getElementById("url-list");
const loadingMessage = document.getElementById("loading-message");

function fetchPosts() {
  isLoading = true;
  loadingMessage.style.display = "block";

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      isLoading = false;
      loadingMessage.style.display = "none";

      if (data.length === 0) {
        return; // No more posts to load
      }

      data.forEach((post) => {
        const listItem = document.createElement("li");

        listItem.textContent = post.body;
        postsList.appendChild(listItem);
        const postUrl = document.createElement("img");
        postUrl.textContent = post.url;
        urlList.appendChild(postUrl);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      isLoading = false;
      loadingMessage.style.display = "none";
    });
}

function isBottomOfPage() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

function handleScroll() {
  if (isBottomOfPage() && !isLoading) {
    fetchPosts();
  }
}

window.addEventListener("scroll", handleScroll);

// Initial load
fetchPosts();
