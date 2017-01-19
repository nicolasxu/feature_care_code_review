var FeatureCardApp = require('./FeatureCardApp.vue')
var Vue = require('vue')
var service = require('./utils/services.js')
var targetClassSelector = '.featurecard'
var whatisnewClassSelector = '.whatisnew'
var contentData = 'contents'
var columnData = 'columns'
var articleData = 'articleCount'
$(document).ready(function(){
  var whatisnew = $(whatisnewClassSelector)
  var appTags = $(targetClassSelector)
  // Run the loop twice since we need the all guid in the pool
  // before bootstraping the app
  for(var i = 0; i < appTags.length; i++) {
    var contentGuidStr = $(appTags[i]).data(contentData)
    service.parseGuid(contentGuidStr, 'featureCard') // put guid in a pool
  }
  // make the blackList guid ready 
  for(var i = 0; i < whatisnew.length; i++ ) {
    var blackGuidStr = $(whatisnew[i]).data(contentData)
    service.parseGuid(blackGuidStr, 'blackList')
  }


  for (var i = 0; i < appTags.length; i++) {

    // Step 1, parsing data passed in div
    var columnCount = $(appTags[i]).data(columnData)
    var contentGuidStr = $(appTags[i]).data(contentData)
    var articleCount = $(appTags[i]).data(articleData)
    service.parseGuid(contentGuidStr, 'featureCard') // put guid in a pool

    // TEST CODE, Remove it when done
    if(!contentGuidStr) {
      // if empty, then use test data
      if ( i === 0) {
        contentGuidStr = "111!222"
      }
      if( i === 1) {
        contentGuidStr = "333!444!555!666"
      }
      articleCount = 3
    }

    // Step 2, bootstrap Vue app based on anchor tag count
    new Vue({
      el: appTags[i],
      template: '<FeatureCardApp :columnCount="columnCount" :cardGuids="cardGuids" :articleCount="articleCount">',
      components: {FeatureCardApp: FeatureCardApp},
      data: {
        columnCount: columnCount,
        cardGuids: contentGuidStr? contentGuidStr.split('!'): [],
        articleCount: articleCount
      },
    }) 
  }
})