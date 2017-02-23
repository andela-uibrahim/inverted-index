const fileIsValid = function (file) {
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

const removeDuplicates = (filteredDocArray) => {
  const filteredContents = [];
  filteredDocArray.forEach((y) => {
    const newList = y.filter((word, index) =>
    y.indexOf(word) === index);
    filteredContents.push(newList);
  });
  return filteredContents;
};


const filterBookContents = (selectedBook) => {
  const filteredDocArray = [];
  selectedBook.forEach((x) => {
    let words = (`${x.title} ${x.text}`)
    .replace(/[.,/#!+$%^&@*?;:'{}=\-_`~()]/g, '').toLowerCase().split(' ');
    words = words.filter(str => /\S/.test(str));
    filteredDocArray.push(words);
  });
  return removeDuplicates(filteredDocArray);
};


const getToken = (filteredContents) => {
  let allStr = '';
  filteredContents.forEach((z) => {
    allStr += `${z.join(' ')} `;
  });
  const freshArray = allStr.trim().split(' ').sort();
  const tokens = freshArray.filter((word, index) =>
  freshArray.indexOf(word) === index);
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
      console.log('invalid file type');
    }
  }
};
