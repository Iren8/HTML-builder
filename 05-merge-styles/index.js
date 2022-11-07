const path = require('path');
const fs = require('fs');

const { stdout } = process;

const dirStylesPath = path.join(__dirname, 'styles');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');

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
            output.write('\n');
          });
        }
      };
    })
  }
})
