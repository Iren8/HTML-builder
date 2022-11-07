const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        filePath = path.join(__dirname, 'secret-folder', file.name);
        fs.stat(path.join(filePath), (err, stats) => {
          console.log((file.name).split('.')[0] + " - " + (path.extname(filePath).slice(1)) + " - " + stats.size + "B");
        });
      };
    })
  }
})