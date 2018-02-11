'use strict';
/**
* make sure you have your directory and regex test set correctly!
*/

var context = require.context('./src', true, /\.specs\.js$/);

context.keys().forEach(context);
