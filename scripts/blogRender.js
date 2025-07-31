const fs = require('node:fs'); 

const folderPath = '../thoughts'; 

console.log(fs.readdirSync(folderPath)); 
