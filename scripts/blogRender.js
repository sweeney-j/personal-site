const fs = require('node:fs'); 
const { marked } = require('marked'); 
const markdownPagePath = '../thoughts/markdown-pages'; 
const htmlPagePath = '../thoughts/html-pages'; 
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

function generateHTML() {
    retrieveUnpublished().forEach((post) => {
        const markdown = fs.readFileSync(`${markdownPagePath}/${post}`, 'utf8'); 
        const html = marked.parse(markdown); 
        const blogName = post.substring(0, post.length - 3); 
        fs.writeFileSync(`${htmlPagePath}/${blogName}.html`, html); 
    }); 
}

generateHTML(); 






