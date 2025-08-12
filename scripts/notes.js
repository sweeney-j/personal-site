var SEASONS = {
    "01": "Winter", 
    "02": "Winter", 
    "03": "Spring", 
    "04": "Spring", 
    "05": "Spring", 
    "06": "Summer", 
    "07": "Summer", 
    "08": "Summer", 
    "09": "Fall", 
    "10": "Fall", 
    "11": "Fall", 
    "12": "Winter", 
}; 

fetch('/configuration/notes.json')
    .then(res => res.json())
    .then(data => { 
        const postList = document.getElementById("posts"); 
        var uniqueId = 0; 
        var previousSeason = "None"; 
        var previousYear = "None"; 
        data.posts.forEach(post => {
            var currentYear = post.date.slice(0,4); 
            var s = post.date.slice(5,7); 
            var currentSeason = SEASONS[s]; 
            var blogClassName = `<div class="blog-${uniqueId}"></div>`;
            postList.innerHTML += blogClassName;
            var currentBlog = document.querySelector(`.blog-${uniqueId}`); 
            // TODO: The path in the json should be relative to this file 
            var blogTitle = `<a href="/pages/thoughts/html-pages/${post.name}.html"<h2 class="blog-heading">${post.title}</h2></a>`; 
            var blogAbout = `<p class="blog-about">${post.description}</p>`;
            var spacer = `<div style="height: 20px;"></div>`;
            if (currentSeason != previousSeason || currentYear != previousYear) {
                var dateHeading = `<h3>${currentSeason} ${currentYear}</h3>`; 
                if (uniqueId > 0) {
                    currentBlog.innerHTML = spacer + dateHeading + spacer + blogTitle + blogAbout;  
                    previousSeason = currentSeason; 
                    previousYear = currentYear; 
                } else {
                    currentBlog.innerHTML = dateHeading + spacer + blogTitle + blogAbout;  
                    previousSeason = currentSeason; 
                    previousYear = currentYear; 
                }
            } else {
                currentBlog.innerHTML = spacer + blogTitle + blogAbout;  
                previousSeason = currentSeason; 
                previousYear = currentYear; 
            }
            uniqueId += 1; 
        }); 
    }); 
