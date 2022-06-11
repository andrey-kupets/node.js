const fs = require('fs');
const path = require('path');

const dir1800 = path.join(__dirname, '18-00');
const dir2000 = path.join(__dirname, '20-00');

const groupDir = [
    dir1800,
    dir2000
];

// 1st
// eslint-disable-next-line no-shadow
// const group = (groupDir) => {
//     groupDir.forEach((dir) => {
//         fs.readdir(dir, (err, files) => {
//             if (err) console.log(err);
//             files.forEach((file) => {
//                 fs.readFile(path.join(dir, file), (err1, data) => {
//                     if (err1) console.log(err1);
//                     if (JSON.parse(data.toString()).gender === 'female') {
//                         fs.rename(path.join(dir, file), path.join(groupDir[0], file), (err2) => {
//                             if (err2) console.log(err2);
//                         });
//                         return;
//                     }
//                     if (JSON.parse(data.toString()).gender === 'male') {
//                         fs.rename(path.join(dir, file), path.join(groupDir[1], file), (err2) => {
//                             if (err2) console.log(err2);
//                         });
//                     }
//                 });
//             });
//         });
//     });
// };
//
// group(groupDir);

// 2nd
const group = (startDir, gender, endDir) => {
    fs.readdir(startDir, (err, files) => {
        if (err) return console.log(err);

        files.forEach((file) => {
            const startPath = path.join(startDir, file);

            fs.readFile(path.join(startPath), (err1, data) => {
                if (err1) return console.log(err1);

                const user = JSON.parse(data.toString());

                if (user.gender === gender) {
                    fs.rename(startPath, path.join(endDir, file), (err2) => {
                        if (err2) return console.log(err2);
                    });
                }
            });
        });
    });
};

group(groupDir[0], 'female', groupDir[1]);
group(groupDir[1], 'male', groupDir[0]);
