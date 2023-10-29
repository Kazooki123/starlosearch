// image_post.js
function initImagePosting() {
    const form = document.getElementById("createPostForm");
    const postsContainer = document.getElementById("posts");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("titleInput").value;
        const imageURL = document.getElementById("imageURLInput").value;
        const caption = document.getElementById("captionInput").value;

        if (title && imageURL) {
            createPost(title, imageURL, caption);
            form.reset();
        }
    });

    function createPost(title, imageURL, caption) {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const img = document.createElement("img");
        img.src = imageURL;
        img.alt = title;

        const postTitle = document.createElement("h3");
        postTitle.textContent = title;

        const postCaption = document.createElement("p");
        postCaption.textContent = caption;

        postElement.appendChild(img);
        postElement.appendChild(postTitle);
        postElement.appendChild(postCaption);

        postsContainer.appendChild(postElement);
    }
}
