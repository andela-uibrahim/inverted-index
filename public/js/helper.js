/**
* helper object for InvertedIndex
* @object
*/
const helpers =
  {
  /** validates input file types
   *
   * @param  {object} file - file to validate type
   * @return {boolean} - true or false
   */
    fileIsValid(file) {
      if (!file.name.toLowerCase().match(/\.json$/)) {
        return false;
      }
      return true;
    },


  /** validates input book contents
   *
   * @param  {array} book - book to validate content
   * @return {boolean} - true or false
   */
    validFileContent: (book) => {
      if (!(book instanceof Array)) {
        return false;
      }
      for (const doc of book) {
        if ((doc.title === undefined) || (doc.text === undefined)) {
          return false;
        }
      }
      return true;
    },

  /** removes duplicate from an array
   *
   * @param  {object} doc - document to remove duplicates from
   * @return {array} newlist - array of filtered contents
   */
    removeDuplicates: (doc) => {
      const newList = doc.filter((word, index) =>
      doc.indexOf(word) === index);
      return newList;
    },

  /** remove duplicates from all files documents
   *
   * @param  {params} filteredDocArray - file to validate
   * @return {boolean} - true or false
   */
    removeDuplicatesInArray: (filteredDocArray) => {
      const filteredContents = [];
      filteredDocArray.forEach((doc) => {
        filteredContents.push(helpers.removeDuplicates(doc));
      });
      return filteredContents;
    },

  /** filters and return an array of filtered
   *  string with special characters removed
   *
   * @param  {String} title -title in book
   * @param  {String} text - text in book
   * @return {Array} words - Array of filtered book contents
   */
    filterContent: (title, text) => {
      text = text || '';
      let words = (`${title} ${text}`)
      .replace(/[^a-zA-Z ]/g, '').toLowerCase().split(' ');
      words = words.filter(str => /\S/.test(str));
      return words;
    },

  /** applies the filterContent function on all
   * the documents in the selectedBook
   *
   * @param  {Array} selectedBook - title and text in book
   * @return {Array} filteredBook - Array of filtered book contents
   */
    filterBookContents: (selectedBook) => {
      const filteredDocArray = [];
      selectedBook.forEach((content) => {
        filteredDocArray.push(helpers.filterContent(content.title,
        content.text));
      });
      const filteredBook = helpers.removeDuplicatesInArray(filteredDocArray);
      return filteredBook;
    },

  /** combines all the documents in a book
   * and returns an Array of sorted strings
   *
   * @param  {Array} filteredContents - Array of filtered book documents
   * @return {Array} sortedArrays - Array of comebined
   * and sorted filtered book content
   */
    comebineAndSortArrays: (filteredContents) => {
      let allStr = '';
      filteredContents.forEach((z) => {
        allStr += `${z.join(' ')} `;
      });
      const sortedArrays = allStr.trim().split(' ').sort();
      return sortedArrays;
    },

  /** removes duplicates from combined and sorted book documents
   *
   * @param  {Array} filteredContents - Array of filtered book documents
   * @return {Array} tokens - Array of unique words.
   */
    getToken: (filteredContents) => {
      const freshArray = helpers.comebineAndSortArrays(filteredContents);
      const tokens = helpers.removeDuplicates(freshArray);
      return tokens;
    },
  };
