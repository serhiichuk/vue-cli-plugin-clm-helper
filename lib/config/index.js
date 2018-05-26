const path = require('path');
const root = process.cwd();

module.exports = {
  paths: {
    root,
    dist: path.join(root, 'dist'),
    src: path.join(root, 'src'),
    screens: path.join(root, 'dist', 'screens'),
    clm: {
      config: path.join(root, 'src', 'clm.config')
    }
  }
};
