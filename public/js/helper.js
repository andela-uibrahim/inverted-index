const fileIsValid = function (file) {
  if (!file.name.toLowerCase().match(/\.json$/)) {
    return false;
  }
  return true;
};
