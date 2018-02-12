'use strict';
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],
    // or can be: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        './node_modules/babel-polyfill/browser.js',
        './src/client/app/**/*.specs.js'
    ],


    // list of files to exclude
    exclude: [ 'node_modules' ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: 
    //      https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { 
       'spec.webpack.js': ['webpack'],
        '**/*.specs.js': ['webpack'],
       '**/*.js': ['sourcemap'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || 
    //      config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests 
    // whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: 
    //  https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    webpack: webpackConfig,

    webpackServer: {
            noInfo: true // Don't spam the console when running in karma!
    },

    plugins: [
        'karma-mocha', 'karma-webpack', 'karma-sourcemap-loader',
        'karma-phantomjs-launcher'
    ]
  });
};
