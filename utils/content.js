const fs = require('fs/promises');
const path = require('path');
const dir = require('./dir');


async function content(ctx, staticPath){
    let filepath = path.join(staticPath, decodeURI(ctx.path));
    let content = '';
    
    
    let stat = await fs.stat(filepath);
    if (stat.isDirectory()){
        content = await dir(ctx, filepath);
    } else if (stat.isFile()){
        content = await fs.readFile(filepath);
    }
    
    return content;
}

module.exports = content;