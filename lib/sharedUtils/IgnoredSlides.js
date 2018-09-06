module.exports = class {
  /**
   *
   * @param filterBySlidePath
   * @param structure
   * @returns {{paths, regexp: *}}
   */
  constructor(filterBySlidePath, structure) {
    this.structure = structure;
    this.filter = filterBySlidePath;

    return {
      paths: this.ignoredPaths,
      regexp: this.ignoredRegexp,
    }
  }

  // get parsePath() {
  //   return {}
  // }

  get ignoredPaths() {
    return this.structure
      .map(sl => !this.filter.test(sl.path) && sl.path.replace('slides/', ''))
      .filter(path => !!path)
  }

  get ignoredRegexp() {
    return new RegExp(this.ignoredPaths.map(path => path.split('/').pop() + '$').join('|'))
  }
};
