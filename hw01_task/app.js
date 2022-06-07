const fs = require('fs');
const path = require('path');

const dirBardak = path.join(__dirname, 'bardak');
const dirStraightened = path.join(__dirname, 'straightened');

// const straighten = (wrongDir, rightDir) => {
//   fs.readdir(wrongDir, (err, files) => {
//       if (err) console.log(err);
//       files.forEach((file) => {
//           const wrongPath = path.join(wrongDir, file);
//           fs.stat(wrongPath, (err1, stats) => {
//               if (err1) console.log(err1);
//               if (stats.isDirectory()) {
//                   straighten(wrongPath, rightDir);
//                   return;
//               }
//               fs.rename(wrongPath, path.join(rightDir, file), (err2) => {
//                   if (err2) console.log(err2);
//               });
//           });
//       });
//   });
// };

const straighten = (wrongDir, rightDir) => {
    fs.readdir(wrongDir, (err, files) => {
        if (err) console.log(err);

        files.forEach((file) => {
            const wrongPath = path.join(wrongDir, file);
            const rightPath = path.join(rightDir, file);

            fs.stat(wrongPath, (err1, stats) => {
                if (err1) console.log(err1);

                if (!stats.isDirectory()) {
                    fs.rename(wrongPath, rightPath, (err2) => {
                        if (err2) console.log(err2);
                    });
                    return;
                }

                straighten(wrongPath, rightDir);
            });
        });
    });
};

straighten(dirBardak, dirStraightened);
