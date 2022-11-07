const path = require('path');
const fs = require('fs');

const dirDestPath = path.join(__dirname, 'project-dist');
const dirSourcePath = path.join(__dirname, 'components');

const { stdout } = process;

const dirStylesPath = path.join(__dirname, 'styles');
const output = fs.createWriteStream(path.join(dirDestPath, 'style.css'), 'utf-8');
// const output = fs.createWriteStream(path.join(dirDestPath, 'style.html'), 'utf-8');


// function callback(err) {
//   if (err) throw err;
//   console.log('File "template.html" was copied to directory "projrct-dist" and renamed as "index.html" successfully!');
// }
// fs.copyFile(path.join(__dirname, "template.html"), path.join(dirDestPath, "index.html"), callback);

// fs.readdir(dirSourcePath, { withFileTypes: true }, (err, files) => {
//   if (err)
//     console.log(err);
//   else {
//     files.forEach(file => {
//       if (file.isFile()) {
//         fileSourcePath = path.join(dirSourcePath, file.name);
//         if (path.extname(fileSourcePath) == '.html') {
//           let name = file.name.split('.')[0];
//         }
//       };
//     })
//   }
// })

fs.access(dirDestPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(dirDestPath, err => {
      if (err) throw err;
      console.log('The folder "files_copy" was created successfully!');
    });
  }
})

fs.readdir(dirStylesPath, { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        filePath = path.join(dirStylesPath, file.name);
        if (path.extname(filePath) == '.css') {
          const readableStream = fs.createReadStream(filePath, 'utf-8');
          readableStream.on('data', chunk => {
            output.write(chunk);
            output.write("\n");
          });
        }
      };
    })
  }
})