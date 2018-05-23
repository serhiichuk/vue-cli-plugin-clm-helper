const path = require('path');
const root = process.cwd();

module.exports = {
  paths: {
    root,
    dist: path.join(root, 'dist'),
    src: path.join(root, 'src'),
    clm: {
      config: path.join(root, 'src', 'clm.config')
    }
  }
};
