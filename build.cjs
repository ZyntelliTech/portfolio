const fs=require('fs');
const path=require('path');
fs.mkdirSync('dist',{recursive:true});
for(const name of ['index.html','styles.css','script.js','case-study.css','Innovative Product Development.html','Innovative Product Development']) fs.cpSync(name,path.join('dist',name),{recursive:true});
const script=fs.readFileSync('script.js','utf8');
const vm=require('vm');
const data=vm.runInNewContext(script.split('const projects=')[0]+';data');
for(const p of data) for(const resource of [p[5],p[6]]){const file=path.join('dist','Innovative Product Development','My Projects',decodeURIComponent(resource));if(!fs.existsSync(file))throw Error('Missing project asset: '+file);}
let pages=0;function check(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())check(file);else if(file.endsWith('.html')){pages++;const html=fs.readFileSync(file,'utf8');if(/Stephen Long Jr|stephenlongjr2@gmail.com/i.test(html))throw Error('Old identity in '+file);}}}check('dist');
console.log(`Built ${pages} pages. All ${data.length} project images and case-study links verified.`);
