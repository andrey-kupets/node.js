// const w = require('./dir/file');
//
// w.createUser('anre', 25)
//
// console.log('**************');
// console.log(__dirname);
// console.log(__filename);
// console.log(global);
// console.log('**************');
//
// console.log(process);

const fs = require('fs');

// const filePath = __dirname + '/dir/file.txt';
// const dirName = __dirname + '/dir';

// fs.writeFile(filePath, 'andJusticeForAll', err => {
//     if (err) {
//         console.log(err)
//     }
// })

// fs.appendFile(filePath, 'hello \n' , err => {
//     if (err) {
//         console.log('----------')
//         console.log(err)
//         console.log('------------')
//     }
// })

// fs.readFile(filePath, (err, data) => {
//     console.log(data);
//     console.log(data.toString());
// })

// fs.mkdir( `${__dirname}/netflix/films/gaga`, {recursive: true},err => {
//     if (err) {
//         console.log('*****************')
//         console.log(err)
//         console.log('*****************')
//     }
// })

// fs.rmdir( `${__dirname}/netflix/films/gaga`,{recursive: true},err => {
//     if (err) {
//         console.log('*****************')
//         console.log(err)
//         console.log('*****************')
//     }
// })

// fs.readdir(dirName, (err, files) => {
//     if (err) {
//         console.log('**************');
//         console.log(err);
//         console.log('**************');
//
//         return;
//     }
//
//     // console.log(files);
//
//     files.forEach(file => {
//         fs.stat(dirName + `/${file}`, ((err1, stats) => {
//             console.log('************');
//             console.log(stats.isDirectory());
//             console.log('************');
//         }))
//     })
// })

// fs.unlink(filePath, err => {
//     if (err) {
//         console.log('************')
//         console.log(err);
//         console.log('************')
//     }
// })

// fs.rename(filePath, `${__dirname}/netflix/superior.mp4`, err => {
//     if (err) {
//         console.log('===========');
//         console.log(err);
//         console.log('===========');
//     }
// })

const path = require('path');
//
// let s = path.join(__dirname, 'dir', '/////////////file.txt')
// console.log(s)
//
// const wrongPath = __dirname + '/dir////////////////file.txt';
// let normilizedPath = path.normalize(wrongPath);
// console.log(normilizedPath);

// const readStream = fs.createReadStream(filePath);
// const writeStream = fs.createWriteStream(filePath);

// readStream.on('data', chunk => {
//     console.log(chunk);
//     console.log('------------')
//     // console.log(chunk.toString());
// })

// readStream.on('end', () => {
//     console.log('три топора');
// })
//
// for (let i = 0; i < 10000; i++) {
//     writeStream.write('andJusticeForAll ');
// }

const readStream = fs.createReadStream(path.join(__dirname, 'dir', 'file.txt'));
const writeStream = fs.createWriteStream(path.join(__dirname, 'dir', 'data.txt'));

// readStream.on('data', chunk => {
//     writeStream.write(chunk);
// })

readStream.pipe(writeStream);
