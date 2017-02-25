class InvertedIndex {
  constructor() {
  }

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

  createIndex(tokens, filteredContents, checkForIndex) {
    this.wordMap = {};
    tokens.forEach((word) => {
      checkForIndex(word, filteredContents, this.wordMap);
    });
    return this.wordMap;
  }


  searchIndex(tokens, indexx) {
    const searchMap = {};
    tokens.forEach((word) => {
      if (word in indexx) {
        searchMap[word] = indexx[word];
      } else {
        searchMap[word] = [false, false, false];
      }
    });
    return searchMap;
  }
}
