import { copyDirectory } from './modules/copyDirectory.js';

const init = () => {
  // Исходная директория
  const sourceDir = './source';
  // Целевая директория
  const targetDir = './target';

  copyDirectory(sourceDir, targetDir, err => {
    if (err) {
      console.error('Ошибка:', err);
    } else {
      console.log('Копирование успешно завершено');
    }
  });
};

init();

console.log('App start');
