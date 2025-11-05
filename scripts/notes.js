fetch('/configuration/notes.json')
    .then(res => res.json())
    .then(data => { 
        const postList = document.getElementById("posts"); 
        var uniqueId = 0; 
        data.posts.forEach(post => {
            var blogClassName = `<div class="blog-${uniqueId}"></div>`;
            postList.innerHTML += blogClassName;
            var currentBlog = document.getElementsByClassName(`blog-${uniqueId}`); 
            // TODO: The path in the json should be relative to this file 
            var blogTitle = `<a href="/pages/thoughts/html-pages/${post.name}.html"><h2 class="blog-heading">${post.title}</h2></a>`; 
            var blogAbout = `<p class="blog-about">${post.description}</p>`;
            currentBlog[0].innerHTML = blogTitle + blogAbout; 
            uniqueId += 1; 
        }); 
    }); 
