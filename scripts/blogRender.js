const fs = require('node:fs'); 

const markdownPagePath = '../thoughts/markdown-pages'; 
const jsonPath = '../notes.json'; 

function loadJson() {
    return JSON.parse(fs.readFileSync(jsonPath)); 
}

function retrievePostedNames() {
    return loadJson().posts.map((post) => {
        return post.name; 
    }); 
}

function retrieveUnpublished() {
    return fs.readdirSync(markdownPagePath).map((p) => {
        return retrievePostedNames()
                .includes(p.substring(0, p.length - 3)) ? "" : p; 
    })
    .filter(Boolean); 
}

