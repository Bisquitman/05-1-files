import { readdir, mkdir, stat, copyFile } from 'node:fs';
import path from 'node:path';

export const copyDirectory = (sourceDir, targetDir, callback) => {
  readdir(sourceDir, (err, files) => {
    if (err) return callback(err);

    mkdir(targetDir, { recursive: true }, err => {
      if (err) return callback(err);

      let filesLeft = files.length;
      if (filesLeft === 0) return callback(null);

      files.forEach(file => {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetDir, file);

        stat(sourceFile, (err, stats) => {
          if (err) return callback(err);

          if (stats.isDirectory()) {
            copyDirectory(sourceFile, targetFile, err => {
              if (err) return callback(err);

              filesLeft--;
              if (filesLeft === 0) return callback(null);
            });
          } else if (stats.isFile()) {
            copyFile(sourceFile, targetFile, err => {
              if (err) return callback(err);

              filesLeft--;
              if (filesLeft === 0) return callback(null);
            });
          }
        });
      });
    });
  });
};
