var api = require('./api.js')
var _ = require('lodash')
require('imagesloaded')
var guidSet = {111:1, 222:1, 333:1, 444:1, 555:1, 666:1}  // cache
var blackSet = {aaa:1, bbb:1, ccc:1, ddd:1} // blacklist, content guid in WhatIsNew control tag
var cards = [] // cache
var cardsDrawSet = {111: 0 , 222: 0 , 333: 0 , 444: 0 , 555:0 , 666: 0 }
var cardsSelector = '.feature-cards-container .card'

// invisible vue app to track if all cards finish drawing


module.exports = {
  guidSet: guidSet,
  parseGuid: parseGuid,
  getCards: getCards,
  blackSet: blackSet,
  checkAdjustCardHeight: checkAdjustCardHeight
}




function checkAdjustCardHeight(cId) {
  // interface
  cardsDrawSet[cId] = 1
  for (var key in cardsDrawSet) {
    if (cardsDrawSet[key] === 0) {
      return
    }
  }
  
  $(cardsSelector).imagesLoaded()
    .done(function () {
      adjustCardHeight()
    })
}

function parseGuid (guidStr, flag) {
  if(typeof guidStr !== 'string') {
    return
  }
  var guidArr = guidStr.split('!')
  if (guidArr.length === 0) {
    return
  }

  guidArr.forEach(function (guid) {
    if(flag === 'featureCard') {
      guidSet[guid] = 1
      // also fill draw set 
      cardsDrawSet[guid] = 0
    }
    if(flag === 'blackList') {
      blackSet[guid] = 1
    }
  })
}

function getCards (articleCount) {

  // if cache exist, return cache
    // call API
  if(cards.length > 0 ) {
    return $.Deferred(function (dfd) {
      return dfd.resolve(cards)
    }).promise()
  }
  // use mockup api here, replace with api.featureCard.getCards when back-end is ready
  return api.featureCard.getCardsMock(guidSet, blackSet, articleCount)
    .then(function (res) {
      cards = res.response
      return res.response
    })
}

function getAllApps() {
  return $.Deferred(function(dfd){
    if(_isDefined(allApps)) {
      return dfd.resolve(allApps)
    }
    api.appBar.getAllAppsDetail(categoryIds)
      .done(function(res){
        if (res.meta.code === 200) {
          allApps = res.response
          dfd.resolve(allApps)
        } else {
          console.error(res.meta.codeDescription)
          return dfd.reject(res.meta.codeDescription)
        }
      })
  }).promise()
}



function adjustCardHeight() {

  if(cards.length === 0) {
    return
  }
  var $cards = $(cardsSelector)
  var tabletWidth = 768
  var winOuterWidth = window.outerWidth
  if (winOuterWidth < tabletWidth) {
    // mobile layout, no need to adjust height
    $cards.find('.card-inner').each(function (card) {
      $(this).removeAttr('style')
    })
    return
  }
  var maxHeight = 0
  

  $cards.each(function () {
    var titleHeight = $(this).find('.card-title').outerHeight()
    var imgHeight = $(this).find('.card-img').outerHeight()
    var linksHeight = $(this).find('.card-links').outerHeight()
    var totalHeight = titleHeight + imgHeight + linksHeight
    if (totalHeight > maxHeight ) {
      maxHeight = totalHeight
    }
  })

  console.log('max height')
  console.log(maxHeight)

  $cards.find('.card-inner').each(function (index) {
    $(this).height(maxHeight)
  })
}

if($('.featurecard').length > 0 ) {
  // this page has feature card
  $(window).on('resize.cardHeight', _.debounce(adjustCardHeight, 250))
}
