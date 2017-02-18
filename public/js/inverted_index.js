class InvertedIndex {
  creatIndex(book) {
    this.book = book;
    this.index = {};
    for (let i = 0; i < book.length; i++) {
      let words = (book[i].title + ' ' + book[i].text).split(' ');
      for (let j = 0; j < words.length; j++) {
        if (this.index[words[j]]) {
          this.index[words[j]].push(i);
        } else {
          this.index[words[j]] = [];
          this.index[words[j]].push(i);
        }
      }
    }

    console.log(this.index);
  }
}
