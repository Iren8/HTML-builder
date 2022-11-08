const path = require('path');
const fs = require('fs');

const dirDestPath = path.join(__dirname, 'project-dist');
const dirSourcePath = path.join(__dirname, 'components');
const { stdout } = process;
const dirStylesPath = path.join(__dirname, 'styles');
const dirAssetsPath = path.join(__dirname, 'assets');


// ------------------------------------------------------------------
fs.access(dirDestPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(dirDestPath, err => {
      if (err) throw err;
      console.log('The folder "project-dist" was created successfully!');

      fs.access(path.join(dirDestPath, 'assets'), fs.constants.F_OK, (err) => {
        if (err) {
          fs.mkdir(path.join(dirDestPath, 'assets'), err => {
            if (err) throw err;
            console.log('The folder "assets" was created successfully!');
          });
        }
      })
    });
  }
})



// ---------------------------------------------------------------------
fs.readdir(dirStylesPath, { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    const output = fs.createWriteStream(path.join(dirDestPath, 'style.css'), 'utf-8');
    files.forEach(file => {
      if (file.isFile()) {
        fileStylesPath = path.join(dirStylesPath, file.name);
        if (path.extname(fileStylesPath) == '.css') {
          const readableStream = fs.createReadStream(fileStylesPath, 'utf-8');
          readableStream.on('data', chunk => {
            output.write(chunk);
            output.write("\n");
          });
        }
      };
    })
  }
})
// --------------------assets-folder-valid-make-directory-----------------------

// ---------------------assets-folder-copy-files-------------------
fs.readdir(dirAssetsPath, { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        function callback(err) {
          if (err) throw err;
          console.log('File' + file.name + 'was copied to directory successfully!');
        }
        fs.copyFile(path.join(dirAssetsPath, file.name), path.join(dirDestPath, 'assets', file.name), callback);
      }
      else {
        const pathNewDirDest = path.join(dirDestPath, 'assets', file.name);
        fs.access(path.join(dirDestPath, 'assets', file.name), fs.constants.F_OK, (err) => {
          if (err) {
            fs.mkdir(pathNewDirDest, err => {
              // if (err) throw err;
              // console.log('The folder "assets"' + file.name + ' was created successfully!');
            });
          }
        })

      }
    });
  }
})





// const pathNewDirSource = path.join(__dirname, 'assets', file.name);
// console.log(pathNewDirDest, pathNewDirSource);
// // ------------------------------------------
// fs.readdir(pathNewDirSource, { withFileTypes: true }, (err, files_2) => {
//   if (err)
//     console.log(err);
//   else {
//     files_2.forEach(file_2 => {
//       if (file_2.isFile()) {
//         function callback(err) {
//           // if (err) throw err;
//           console.log('File' + file_2.name + 'was copied to directory successfully!');
//         }
//         fs.copyFile(path.join(__dirname, 'assets', file.name, file_2.name), path.join(pathNewDirDest, file_2.name), callback);
//       }
//     });
//   }
// })