const fs = require('fs');
const path = require('path');

const dirDestPath = path.join(__dirname, 'files-copy');
const dirSourcePath = path.join(__dirname, 'files');

fs.access(dirDestPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(dirDestPath, err => {
      if (err) throw err;
      console.log('The folder "files_copy" was created successfully!');
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
          console.log(dirSourcePath + "\\" + file.name + ' was copied to' + "\\" + dirDestPath + file.name);
        }
        fs.copyFile(path.join(dirSourcePath, file.name), path.join(dirDestPath, file.name), callback);
      };
    })
  }
})