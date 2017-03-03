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

describe('Test the create index functionality',
 () => {
   let firstContent; let secondContent; let filteredContents;
   let invertedIndex;
   beforeEach(() => {
     invertedIndex = new InvertedIndex();
     firstContent = ['hello', 'world'];
     secondContent = ['hello', 'bayo'];
     filteredContents = [firstContent, firstContent, secondContent];
   });

   it('should return "object" when its type is checked', () => {
     expect(typeof (invertedIndex.createIndex(firstContent,
     filteredContents, invertedIndex.checkForIndex))).toBe('object');
   });

   it('should create an object once the class is declared', () => {
     expect(invertedIndex.createIndex(firstContent,
     filteredContents, invertedIndex.checkForIndex)).toEqual({
       hello: [true, true, true],
       world: [true, true, false] });
   });
 });

describe('Test the search index functionality',
 () => {
   let tokens; let indexx;
   let invertedIndex;
   beforeEach(() => {
     invertedIndex = new InvertedIndex();
     tokens = ['hello', 'world', 'alice', 'man'];
     indexx = { man: [true, false, false], hello:
     [true, true, false], indian: [true, false, true] };
   });

   it('should return "object" when its type is checked', () => {
     expect(typeof (invertedIndex.searchIndex(tokens, indexx))).toBe('object');
   });

   it('should return an array of objects with tokens and their indexs ', () => {
     expect(invertedIndex.searchIndex(tokens, indexx)).toEqual({
       hello: [true, true, false],
       world: [false, false, false],
       alice: [false, false, false],
       man: [true, false, false] });
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

describe('validateFileContents',
 () => {
   let book1, book2, book3, book4;
   beforeEach(() => {
     book1 = [{ title: 'Alice , / ?', text: 'enters a a.' },
     { title: 'Fellowship )&* ...', text: 'wizard on on' },
     { title: 'Thee + = - ee', text: 'un un usuals' }];
     book2 = { men: 'kskkskskskkskskskksksk' };
     book3 = { boy: 'usman', girl: 'dammy' };
     book4 = 'this is the way we roll around here';
   });

   it('should return boolean for a valid json file input', () => {
     expect(typeof (validFileContent(book1))).toBe('boolean');
   });

   it('should return true for valid file contents', () => {
     expect(validFileContent(book1)).toBe(true);
   });

   it('should return false for an invalid data format', () => {
     expect(validFileContent(book2)).toBe(false);
     expect(validFileContent(book3)).toBe(false);
     expect(validFileContent(book4)).toBe(false);
   });
 });

describe('comebineAndSortArray',
 () => {
   let book1;
   beforeEach(() => {
     book1 = [['alice', 'enters'], ['fellowship', 'wizard'],
     ['thee', 'usuals']];
   });

   it('should return " array " for a valid json file input', () => {
     expect(typeof (comebineAndSortArrays(book1))).toBe(typeof ([]));
   });

   it('should return "an array of comebined and sorted contents"', () => {
     expect(comebineAndSortArrays(book1)).toEqual(['alice', 'enters',
       'fellowship', 'thee', 'usuals', 'wizard']);
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

describe('removeDuplicatesInArray',
 () => {
   it('should return " array " sorted non-repeated/unique tokens present' +
     'in the filterBookContents', () => {
     expect(typeof (removeDuplicatesInArray([['alice', 'alice', 'world'],
       ['hello', 'hello', 'world'], ['alice',
         'world', 'world']]))).toBe(typeof ([]));
   });

   it('should return "an array of books with filtered contents"', () => {
     expect(removeDuplicatesInArray([['alice', 'alice', 'world'],
       ['hello', 'hello', 'world'], ['alice', 'world',
         'world']])).toEqual([['alice', 'world'], ['hello', 'world'],
          ['alice', 'world']]);
   });
 });

describe('removeDuplicatesInArray',
 () => {
   it('should return " array " sorted non-repeated/unique tokens present' +
     'in the filterBookContents', () => {
     expect(typeof (removeDuplicates(['alice', 'alice',
       'world']))).toBe(typeof ([]));
   });

   it('should return "an array of books with filtered contents"', () => {
     expect(removeDuplicates(['alice', 'alice',
       'world'])).toEqual(['alice', 'world']);
   });
 });
