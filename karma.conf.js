// Karma configuration
// Generated on Mon Feb 13 2017 15:25:02 GMT-0500 (Eastern Standard Time)

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: ['lib/jquery/jquery-3.1.1.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js',
      'https://code.angularjs.org/1.6.1/angular-route.min.js',
      'public/js/helper.js',
      'public/js/InvertedIndex.js',
      'public/js/InvertedIndexUI/*.js',
      'spec/InvertedIndex.spec.bundled.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

    preprocessors: {
      'public/js/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'verbose'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN
// || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


// enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


// start these browsers
// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
