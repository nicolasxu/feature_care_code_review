var request = require('./request.js')
var mockupData = require('../mockData.js')
var domainName = window.location.origin // e.g.: 'http://local.nhintranet.org'
module.exports = {
  featureCard: {
    getCards: getCards,
    getCardsMock: getCardsMock
  }
}

function getCards(guidSet, blackSet, articleCount) {
  // build query `string`
  if(!guidSet) {
    return request.get('')
  }
  var contentGuids = Object.keys(guidSet)
  var blackGuids = Object.keys(blackSet? blackSet: {})
  if (contentGuids.length === 0) {
    return request.get('')
  }
  var apiPath = '/mapi/public/xxxxxxxx.json'
  var urlWithQueryString = domainName + apiPath + '?'
  urlWithQueryString = urlWithQueryString + 'contentIds='
  contentGuids.forEach(function (id, index, arr) {
    urlWithQueryString = urlWithQueryString + (index === 0?'':'!') + id
  })
  urlWithQueryString = urlWithQueryString + '&blacklist='
  blackGuids.forEach(function (id, index, arr) {
    urlWithQueryString = urlWithQueryString + (index === 0?'':'!') + id
  })

  urlWithQueryString = urlWithQueryString + '&articleCount=' + articleCount
  
  return request.get(urlWithQueryString)
}

function getCardsMock(guidSet, blackSet, articleCount) {
  return $.Deferred(function (dfd) {
    setTimeout( function () {
      var res = {
        meta: {code: 200, codeDescription:"OK"},
        response: mockupData.cards
      }
      return dfd.resolve(res)
    }, 1000)
    
  }).promise()
}

function getAppsDetail(ids) {
  if (!Array.isArray(ids)) {
    console.error('param passed to API is not an array')
    return
  }
  var apiPath = '/mapi/public/ReturnAppsList.json'
  var urlWithQueryString = domainName + apiPath + '?'
  urlWithQueryString = urlWithQueryString + 'appids='
  ids.forEach (function (id, index, arr) {
    urlWithQueryString = urlWithQueryString + (index === 0?'':'!') + id
  })
  
  return request.get(urlWithQueryString)
}

function getAllAppsDetail(ids) {
  if (!Array.isArray(ids)) {
    console.error('param passed to API is not an array')
    return
  }  
  var apiPath = '/mapi/public/ReturnAppsByCategory.json'
  var urlWithQueryString = domainName + apiPath + '?'
  urlWithQueryString = urlWithQueryString + 'category='
  ids.forEach (function (id, index, arr) {
    urlWithQueryString = urlWithQueryString + (index === 0?'':'!') + id
  })
  return request.get(urlWithQueryString)
}