class InvertedIndex {
  constructor() {
    this.wordMap = {};
  }

  createIndex(tokens, filteredContents) {
    tokens.forEach((word) => {
      filteredContents.forEach((book, index) => {
        if (book.includes(word)) {
          if (!this.wordMap[word]) {
            this.wordMap[word] = [true];
          } else {
            this.wordMap[word].push(true);
          }
        } else if (!this.wordMap[word]) {
          this.wordMap[word] = [false];
        } else {
          this.wordMap[word].push(false);
        }
      });
    });
    console.log(this.wordMap);
    return this.wordMap;
  }
}
