describe('Test if the object exist and new instances can be created from it',
 () => {
   let invertedIndex;
   beforeEach(() => {
     invertedIndex = new InvertedIndex();
   });

   it('should return "function" when its type is checked', () => {
     expect(typeof (InvertedIndex)).toEqual('function');
   });

   it('should create an object once the class is declared', () => {
     expect(invertedIndex).toEqual(jasmine.any(Object));
   });

   it('should create an instance of itself once its attached to the' +
  '"new" key word',
  () => {
    expect(invertedIndex instanceof InvertedIndex).toBeTruthy();
  });
 });

describe('fileIsValid',
 () => {
   let file1; let file2; let file3; let file4;
   beforeEach(() => {
     file1 = { name: 'book.json' }; file2 = { name: 'book.css' };
     file3 = { name: 'book' }; file4 = { name: 'book.JSON' };
   });

   it('should return "true" for a valid json file', () => {
     expect(fileIsValid(file1)).toBe(true);
     expect(fileIsValid(file4)).toBe(true);
   });

   it('should return "false" for an invalid file', () => {
     expect(fileIsValid(file2)).toBe(false);
     expect(fileIsValid(file3)).toBe(false);
   });
 });

describe('filterBookContents',
 () => {
   let book1;
   beforeEach(() => {
     book1 = [{ title: 'Alice , / ?', text: 'enters a a.' },
     { title: 'Fellowship )&* ...', text: 'wizard on on' },
     { title: 'Thee + = - ee', text: 'un un usuals' }];
   });

   it('should return " array " for a valid json file input', () => {
     expect(typeof (filterBookContents(book1))).toBe(typeof ([]));
   });

   it('should return "an array of books with filtered contents"', () => {
     expect(filterBookContents(book1)).toEqual([['alice', 'enters', 'a'],
      ['fellowship', 'wizard', 'on'], ['thee', 'ee', 'un', 'usuals']]);
   });
 });

describe('getTokens',
 () => {
   it('should return " array " sorted non-repeated/unique tokens present' +
     'in the filterBookContents', () => {
     expect(typeof (getToken([['alice', 'hello', 'world'],
       ['alice', 'hello', 'world'], ['alice',
         'hello', 'world']]))).toBe(typeof ([]));
   });

   it('should return "an array of books with filtered contents"', () => {
     expect(getToken([['guy', 'alice', 'hello', 'world'], ['alice',
       'hello', 'man', 'man', 'world'], ['alice', 'hello',
         'world']])).toEqual(['alice', 'guy', 'hello', 'man', 'world']);
   });
 });

describe('removeDuplicates',
 () => {
   it('should return " array " sorted non-repeated/unique tokens present' +
     'in the filterBookContents', () => {
     expect(typeof (removeDuplicates([['alice', 'alice', 'world'],
       ['hello', 'hello', 'world'], ['alice',
         'world', 'world']]))).toBe(typeof ([]));
   });

   it('should return "an array of books with filtered contents"', () => {
     expect(removeDuplicates([['alice', 'alice', 'world'],
       ['hello', 'hello', 'world'], ['alice', 'world',
         'world']])).toEqual([['alice', 'world'], ['hello', 'world'],
          ['alice', 'world']]);
   });
 });
