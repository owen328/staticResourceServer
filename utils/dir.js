const fs = require('fs/promises');
const path = require('path');


async function dir(ctx, dirpath){
    let dirlist = [],
        fileList = [],
        content;
    let files = await fs.readdir(dirpath);
    for (let file of files) {
        let ext = path.extname(file);
        if (ext){
            fileList.push(file);
        }else{
            dirlist.push(file);
        }
    }
    let result = dirlist.concat(fileList);
    content = '<ul>';
    for (let item of result) {
        content += `<li><a href="${ctx.path === '/' ? '' : ctx.path}/${item}">${item}</a></li>`;
    }
    content += '</ul>';
    return content;
}
module.exports = dir;