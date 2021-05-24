const fs = require('fs');
const path = require('path');

const dir1800 = path.join(__dirname, '18-00');
const dir2000 = path.join(__dirname, '20-00');

// fs.readdir(dir1800, (err, files) => {
//     if (err) console.log(err);
//     files.forEach((file) => {
//         fs.readFile(path.join(dir1800, file), (err1, data) => {
//             if (err1) console.log(err1);
//             if (JSON.parse(data.toString()).gender === 'male') {
//                 fs.rename(path.join(dir1800, file), path.join(dir2000, file), (err2) => {
//                     if (err2) console.log(err2);
//                 });
//             }
//         });
//     });
// });
//
// fs.readdir(dir2000, (err, files) => {
//     if (err) console.log(err);
//     files.forEach((file) => {
//         fs.readFile(path.join(dir2000, file), (err1, data) => {
//             if (err1) console.log(err1);
//             if (JSON.parse(data.toString()).gender === 'female') {
//                 fs.rename(path.join(dir2000, file), path.join(dir1800, file), (err2) => {
//                     if (err2) console.log(err2);
//                 });
//             }
//         });
//     });
// });

const groupDir = [
    dir1800,
    dir2000
];
// const group = (groupDir) => {
    groupDir.forEach((dir) => {
        fs.readdir(dir, (err, files) => {
            if (err) console.log(err);
            files.forEach((file) => {
                fs.readFile(path.join(dir, file), (err1, data) => {
                    if (err1) console.log(err1);
                    if (JSON.parse(data.toString()).gender === 'female') {
                        fs.rename(path.join(dir, file), path.join(groupDir[0], file), (err2) => {
                            if (err2) console.log(err2);
                        });
                        return;
                    }
                    if (JSON.parse(data.toString()).gender === 'male') {
                        fs.rename(path.join(dir, file), path.join(groupDir[1], file), (err2) => {
                            if (err2) console.log(err2);
                        });
                    }
                });
            });
        });
    });
// }

// group(groupDir);
