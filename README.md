# inverted-index
[![Code Climate](https://codeclimate.com/repos/589cdef10f4d540461001a76/badges/6871b507f8dd13435d4a/gpa.svg)](https://codeclimate.com/repos/589cdef10f4d540461001a76/feed)
[![Issue Count](https://codeclimate.com/repos/589cdef10f4d540461001a76/badges/6871b507f8dd13435d4a/issue_count.svg)](https://codeclimate.com/repos/589cdef10f4d540461001a76/feed)

[![Coverage Status](https://coveralls.io/repos/github/andela-uibrahim/inverted-index/badge.svg?branch=chore%2F2%2Fsetting-up-continous-integration)](https://coveralls.io/github/andela-uibrahim/inverted-index?branch=chore%2F2%2Fsetting-up-continous-integration)
[![Build Status](https://travis-ci.org/andela-uibrahim/inverted-index.svg?branch=master)](https://travis-ci.org/andela-uibrahim/inverted-index)

### Background Information
    -An Inverted Index is an Index Data Structure storing a mapping from content to location 
    -(i.e. a mapping of words or numbers to it's location in a database file).

### Features
    - Users are able to click an 'Upload File' to upload book files which also allow multiple uploads
        -Upload a json file of format Book = { { "title": "Andela", "text": "EPIC and four c" },
         { "title": "Andela Fellow ", "text": "Four years, TIA." } }
 	- Users are able to click a 'Create Index' button to create an Index based on data in uploaded files
 	- Users are able to search through files that have been indexed which enables;
 		- Searching through selected files
 		- Search through all indexed files
 	- Users will be able to view the result of indexed files and searched words in a tabular format showing 
 		- Title of books
 		- Number of word occureences in each book if word is found
 		- A found or not found icon depeding on if the word is found
 
### Why the project is useful
    -it can be used to search through books and match words in other words, it can be use as a plagiarism checker

### How users can get started with the project
 	- Open your browser to visit the [homepage] and follow the instructions there
 	- Upload valid json book files (that have a text and title property)
 	- Select an uploaded book file(s) from the selector and click create index
  	- The index for the book(s) is/are shown in tabular format as show bellow

                Term      Doc_1  Doc_2
                -------------------------
                andela  |   +   |  +
                epic    |   +   |
                and     |   +   |  
                four    |   +   |  +
                c       |   +   |  
                fellow  |       |  +
                years   |       |  +
                tia     |       |  +

  	- Search for a text or sequence of text in a selected file or all files
 	- Click the search button and wait for the search results to be displayed in this format
                Term      Doc_1  Doc_2
                -------------------------
                andela  |   +   |  +
                fellow  |   +   |

 ### Technologies
 	 node.js - For backendend development
 	 Gulp - the streaming build system
     AngularJS - for frontend development
 	 Twitter Bootstrap - for responsive frontend design
 	 karma - to automate testing
 	 jasmine - for writing the tests
 
 ### How to setup the project/Installation/Configuration
 	- (will be updated)
 
 ### How to run tests
 	- (will be updated)
 
 ### Limitations of the project
 	- Files must have a specific structure for index to be created
 
 ### Contributing to the project
 	- **Ibrahim usman**
 
 ### Troubleshooting & FAQ
 	[https://github.com/andela-uibrahim/inverted-index/issues](https://github.com/andela-uibrahim/inverted-index/issues)
 
 ### License
    -N/A
