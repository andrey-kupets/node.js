const fs = require('fs');
const path = require('path');

const dir1800 = path.join(__dirname, '18-00');
const dir2000 = path.join(__dirname, '20-00');

fs.readdir(dir1800, (err, files) => {
    if (err) {
        console.log(err);
    }
    files.forEach(file => {
        console.log(file);
        fs.readFile(path.join(dir1800, file), (err1, data) => {
            if (JSON.parse(data).gender === 'male') {
                fs.rename(path.join(dir1800, file), path.join(dir2000, file), err1 => {
                    if (err1) {
                        console.log(err1)
                    }
                })
            }
        })
    })
})

fs.readdir(dir2000, (err, files) => {
    if (err) {
        console.log(err);
    }
    files.forEach(file => {
        console.log(file);
        fs.readFile(path.join(dir2000, file), (err1, data) => {
            if (JSON.parse(data).gender === 'female') {
                fs.rename(path.join(dir2000, file), path.join(dir1800, file), err1 => {
                    if (err1) {
                        console.log(err1)
                    }
                })
            }
        })
    })
})


