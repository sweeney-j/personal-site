const fs = require('node:fs');
const marked = require('marked');

const markdownPagePath = '../pages/thoughts/markdown-pages'; 
const htmlPagePath = '../pages/thoughts/html-pages'; 
const jsonPath = '../configuration/notes.json'; 

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
        copyBasePage(blogName); 
        const newPost = fs.readFileSync(`${htmlPagePath}/${blogName}.html`, 'utf8'); 
        const finalPage = newPost.replace('__PLACEHOLDER__', html); 
        fs.writeFileSync(`${htmlPagePath}/${blogName}.html`, finalPage); 
    }); 
}

// Copies the base page format and writes it under a new name. 
function copyBasePage(blogName) {
    const baseFile = fs.readFileSync(`${htmlPagePath}/base-page.html`, 'utf8'); 
    fs.writeFileSync(`${htmlPagePath}/${blogName}.html`, baseFile); 
}

function updateJSON(title, description, date, filePath, name) {
    const newPost = {
        title: title, 
        description: description, 
        date: date, 
        filePath: filePath,
        name: name
    }; 

    const data = loadJson(); 
    data.posts.push(newPost); 
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

function main() {
    const prompt = require('prompt-sync')(); 
    const title = prompt("Title of new blog?"); 
    const description = prompt("Description of the blog?"); 
    const date = new Date().toISOString().slice(0,10); 
    const name = retrieveUnpublished()[0].slice(0, -3); 
    // Assuming only one post gets pushed at a time
    const filePath = `${htmlPagePath}/${name}.html`; 
    generateHTML(); 
    // Order matters here: Marked it as published AFTER. 
    updateJSON(title, description, date, filePath, name); 

    //const { execSync } = require('child_process');
    // execSync(`git add . && git commit -m "Add blog post: ${title}" && git push`);
}

if (require.main === module) {
  main();
}







