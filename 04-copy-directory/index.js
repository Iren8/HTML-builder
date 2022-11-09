const fs = require('fs');
const path = require('path');

const dirDestPath = path.join(__dirname, 'files-copy');
const dirSourcePath = path.join(__dirname, 'files');

function checkCopiedFolder() {
  fs.readdir(__dirname, { withFileTypes: true }, (err, files_and_dirs) => {
    if (err)
      console.log(err);
    files_and_dirs.forEach(file_or_dir => {
      if (file_or_dir.name === "files-copy" && file_or_dir.isDirectory) {
        function deleteContentFiles() {
          fs.readdir(path.join(__dirname, 'files-copy'), { withFileTypes: true }, (err, files) => {
            if (err) throw err;
            for (let iter of files) {
              fs.access(path.join(__dirname, 'files', iter.name), fs.constants.F_OK, (err) => {
                if (err) {
                  // console.log("File '" + iter.name + "' was deleted!")
                  fs.unlink(path.join(__dirname, 'files-copy', iter.name), err => {
                  });
                }
              })
            }
          });
        }
        deleteContentFiles(path.join());
      }
    })
  })
}

fs.access(dirDestPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(dirDestPath, err => {
      if (err) throw err;
      console.log('The folder "files_copy" was created successfully!');
      checkCopiedFolder();
    });
  }
})

fs.readdir(dirSourcePath, { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        function callback(err) {
          if (err) throw err;
          console.log(dirSourcePath + "\\" + file.name + ' was copied to ' + "\\" + dirDestPath + file.name);
        }
        fs.copyFile(path.join(dirSourcePath, file.name), path.join(dirDestPath, file.name), callback);
        checkCopiedFolder();
      };
    })
  }
})