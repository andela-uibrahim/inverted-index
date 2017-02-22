const fileIsValid = function (file) {
  if (!file.name.toLowerCase().match(/\.json$/)) {
    return false;
  }
  return true;
};


const filterBookContents = (selectedBook) => {
  const filteredContents = [];
  const filteredDocArray = [];
  selectedBook.forEach((x) => {
    const words = (`${x.title} ${x.text}`)
    .replace(/[.,/#!$%^&@*?;:'{}=\-_`~()]/g, '')
    .trim().toLowerCase().split(' ');
    filteredDocArray.push(words);
  });
  filteredDocArray.forEach((y) => {
    const newList = y.filter((word, index) =>
    y.indexOf(word) === index);
    filteredContents.push(newList);
  });
  return filteredContents;
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
