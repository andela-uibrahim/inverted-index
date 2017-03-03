/** validates input file types
 *
 * @param  {object} file - file to validate type
 * @return {boolean} - true or false
 */
const fileIsValid = (file) => {
  if (!file.name.toLowerCase().match(/\.json$/)) {
    return false;
  }
  return true;
};


/** validates input book contents
 *
 * @param  {array} book - book to validate content
 * @return {boolean} - true or false
 */
const validFileContent = (book) => {
  if (!(book instanceof Array)) {
    return false;
  }
  for (const doc of book) {
    if ((doc.title === undefined) || (doc.text === undefined)) {
      return false;
    }
  }
  return true;
};

/** removes duplicate from an array
 *
 * @param  {object} doc - document to remove duplicates from
 * @return {array} newlist - array of filtered contents
 */
const removeDuplicates = (doc) => {
  const newList = doc.filter((word, index) =>
    doc.indexOf(word) === index);
  return newList;
};

/** remove duplicates from all files documents
 *
 * @param  {params} filteredDocArray - file to validate
 * @return {boolean} - true or false
 */
const removeDuplicatesInArray = (filteredDocArray) => {
  const filteredContents = [];
  filteredDocArray.forEach((doc) => {
    filteredContents.push(removeDuplicates(doc));
  });
  return filteredContents;
};

/** filters and return an array of filtered
 *  string with special characters removed
 *
 * @param  {String} title -title in book
 * @param  {String} text - text in book
 * @return {Array} words - Array of filtered book contents
 */
const filterContent = (title, text) => {
  text = text || '';
  let words = (`${title} ${text}`)
    .replace(/[.,/#!+$%^&@*?;:'{}=\-_`~()]/g, '').toLowerCase().split(' ');
  words = words.filter(str => /\S/.test(str));
  return words;
};

/** applies the filterContent function on all
 * the documents in the selectedBook
 *
 * @param  {Array} selectedBook - title and text in book
 * @return {Array} filteredBook - Array of filtered book contents
 */
const filterBookContents = (selectedBook) => {
  const filteredDocArray = [];
  selectedBook.forEach((content) => {
    filteredDocArray.push(filterContent(content.title, content.text));
  });
  const filteredBook = removeDuplicatesInArray(filteredDocArray);
  return filteredBook;
};

/** combines all the documents in a book
 * and returns an Array of sorted strings
 *
 * @param  {Array} filteredContents - Array of filtered book documents
 * @return {Array} sortedArrays - Array of comebined
 * and sorted filtered book content
 */
const comebineAndSortArrays = (filteredContents) => {
  let allStr = '';
  filteredContents.forEach((z) => {
    allStr += `${z.join(' ')} `;
  });
  const sortedArrays = allStr.trim().split(' ').sort();
  return sortedArrays;
};

/** removes duplicates from combined and sorted book documents
 *
 * @param  {Array} filteredContents - Array of filtered book documents
 * @return {Array} tokens - Array of unique words.
 */
const getToken = (filteredContents) => {
  const freshArray = comebineAndSortArrays(filteredContents);
  const tokens = removeDuplicates(freshArray);
  return tokens;
};

/** reads and load file contents into the contents Array;
 *
 * @param  {Array} currentFile - passes the content in current file
 * @param  {Array} contents - an array that stores the contents
 * that has been read
 */
const updateFiles = currentFile => new Promise((resolve) => {
    // let content;
  const reader = new FileReader();
  reader.readAsText(currentFile);
  reader.onload = (e) => {
    resolve(JSON.parse(e.target.result));
    // contents.push(content);
  };
});


/** handles the file uploads on user request
 *
 * @param  {Array} books - an Array of uploaded books and contents.
 * @param  {Array} filesArray - an Array of bookes without contents.
 * @param  {Array} contents - an array of uploaded books contents.
 * @return {Array} array of boolean to signify uploads success of failure.
 */
const uploadFiles = (books, filesArray) => {
  for (const file of filesArray) {
    if (fileIsValid(file)) {
      const fileNames = Object.keys(books).map(book => books[book].name);
      if (!(fileNames.includes(file.name))) {
        updateFiles(file).then((content) => {
          file.content = content;
        });
        books[file.name] = file;
        // updateFiles(file, contents);
      }
    } else {
      return [false, file];
    }
  }
  // console.log(books['touch.json'].cont);
  return [true];
};

