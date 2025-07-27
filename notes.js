// var notesJson = fetch('notes.json').then(res => res.json());

var notesJson = '{"posts": [ { "title": "Example Title", "description": "This is example preview text to test my automated system", "date":"27.07.2025" }, { "title": "Example Title 2.0", "description": "This is example preview text to test my automated system", "date":"27.07.2025" } ] }'

var test = JSON.parse(notesJson); 

const postList = document.getElementById("posts"); 

var uniqueId = 0; 
test.posts.forEach(post => {
    var blogClassName = `<div class="blog-${uniqueId}"></div>`;
    postList.innerHTML += blogClassName;
    var currentBlog = document.getElementsByClassName(`blog-${uniqueId}`); 
    var blogTitle = `<h2 class="blog-heading">${post.title}</h2>`; 
    var blogAbout = `<p class="blog-about">${post.description}</p>`;
    currentBlog[0].innerHTML = blogTitle + blogAbout; 
    uniqueId += 1; 
}); 


