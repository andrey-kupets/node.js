const fs = require('fs');
const path = require('path');

const dirBardak = path.join(__dirname, 'bardak');
const dirStraightened = path.join(__dirname, 'straightened');

console.log(dirBardak);

function straighten(wrongDir, rightDir) {
    fs.readdir(wrongDir, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(files)
        files.forEach(file => {
            const wrongPath = path.join(wrongDir, `${file}`);
            fs.stat(wrongPath, ((err1, stats) => {
                if (err1) {
                    console.log(err1);
                    return;
                }
                if (stats.isDirectory()) {
                    straighten(wrongPath, rightDir);
                } else {
                    fs.rename(wrongPath, path.join(rightDir, `${file}`), err2 => {
                        if (err2) {
                            console.log(err2);
                        }
                    })
                }
            }))
        })
    })
}

straighten(dirBardak, dirStraightened)
