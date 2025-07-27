var notesJson = fetch('notes.json').then(res => res.json());

console.log(notesJson); 

const postList = document.querySelector("#posts"); 

notesJson.posts.forEach(post => {
    postList.innerHTML += '<div class="blog-post"></div>';
}); 

console.log(postList); 


