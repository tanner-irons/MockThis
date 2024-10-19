const fs = require('fs');
const path = require('path');

function removeEmptyDirs(directory) {
  const files = fs.readdirSync(directory);

  if (files.length === 0) {
    fs.rmdirSync(directory);
    return;
  }

  files.forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeEmptyDirs(fullPath);
    }
  });

  // Re-check the directory after removing subdirectories
  if (fs.readdirSync(directory).length === 0) {
    fs.rmdirSync(directory);
  }
}

const targetDir = path.resolve(__dirname, '../dist/types');
removeEmptyDirs(targetDir);