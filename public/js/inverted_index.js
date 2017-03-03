class InvertedIndex {

  /** creates index and update the indexed files
   * @param {Array} word - object to br returned
   * @param {Array} filteredContents - an array of all contents in file
   * @param {object} wordMap - an array of all contents in file
   * @return  {null}  - null
   */
  checkForIndex(word, filteredContents, wordMap) {
    filteredContents.forEach((book) => {
      if (book.includes(word)) {
        if (!wordMap[word]) {
          wordMap[word] = [true];
        } else {
          wordMap[word].push(true);
        }
      } else if (!wordMap[word]) {
        wordMap[word] = [false];
      } else {
        wordMap[word].push(false);
      }
    });
  }

/** creates index and update the indexed files
  * @param {Array} tokens - object to br returned
  * @param {Array} filteredContents - an array of all contents in file
  * @param {function} checkForIndex - an array of all contents in file
  * @return  {object}  - this.wordMap;
  */
  createIndex(tokens, filteredContents, checkForIndex) {
    this.wordMap = {};
    tokens.forEach((word) => {
      checkForIndex(word, filteredContents, this.wordMap);
    });
    return this.wordMap;
  }


/** creates index and update the indexed files
  * @param {Array} tokens - object to br returned
  * @param {object} indexx - a collection of indexed files
  * @param {function} checkForIndex - an array of all contents in file
  * @return  {object}  - this.wordMap;
  */
  searchIndex(tokens, indexx) {
    const searchMap = {};
    tokens.forEach((word) => {
      if (word in indexx) {
        searchMap[word] = indexx[word];
      } else {
        searchMap[word] = Array(3).fill(false);
      }
    });
    return searchMap;
  }
}
