const fileIsValid = (file) => {
  if (!file.name.toLowerCase().match(/\.json$/)) {
    return false;
  }
  return true;
};

const validFileContent = (book) => {
  if (!(book instanceof Array)) {
    return false;
  }
  for (let i = 0; i < book.length; i++) {
    if ((book[i].title === undefined) || (book[i].text === undefined)) {
      return false;
    }
  }
  return true;
};
const removeDuplicates = (doc) => {
  const newList = doc.filter((word, index) =>
    doc.indexOf(word) === index);
  return newList;
};
const removeDuplicatesInArray = (filteredDocArray) => {
  const filteredContents = [];
  filteredDocArray.forEach((doc) => {
    filteredContents.push(removeDuplicates(doc));
  });
  return filteredContents;
};
const filterContent = (title, text) => {
  text = text || '';
  let words = (`${title} ${text}`)
    .replace(/[.,/#!+$%^&@*?;:'{}=\-_`~()]/g, '').toLowerCase().split(' ');
  words = words.filter(str => /\S/.test(str));
  return words;
};
const filterBookContents = (selectedBook) => {
  const filteredDocArray = [];
  selectedBook.forEach((content) => {
    filteredDocArray.push(filterContent(content.title, content.text));
  });
  return removeDuplicatesInArray(filteredDocArray);
};

const comebineAndSortArrays = (filteredContents) => {
  let allStr = '';
  filteredContents.forEach((z) => {
    allStr += `${z.join(' ')} `;
  });
  return allStr.trim().split(' ').sort();
};

const getToken = (filteredContents) => {
  const freshArray = comebineAndSortArrays(filteredContents);
  const tokens = removeDuplicates(freshArray);
  return tokens;
};

const updateFiles = (currentFile, contents) => {
  let content;
  const reader = new FileReader();
  reader.readAsText(currentFile);
  reader.onload = (e) => {
    content = JSON.parse(e.target.result);
    contents.push(content);
  };
};

const uploadFiles = ($scopeDotbooks, filesArray, contents) => {
  for (let i = 0; i < filesArray.length; i++) {
    const valid = fileIsValid(filesArray[i]);
    if (valid) {
      const book = {};
      book.name = filesArray[i].name;
      const currentFile = filesArray[i];
      book.size = currentFile.size;
      if ($scopeDotbooks === []) {
        $scopeDotbooks.push(book);
        updateFiles(currentFile, contents);
      } else if ($scopeDotbooks !== []) {
        let counter = 0;
        $scopeDotbooks.forEach((uploadedBook) => {
          if (uploadedBook.name === book.name) {
            counter += 1;
          }
        });
        if (counter === 0) {
          $scopeDotbooks.push(book);
          updateFiles(currentFile, contents);
        }
      }
    } else {
      return [false, filesArray[i]];
    }
  }
  return [true];
};

