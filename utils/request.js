module.exports = {
  get: getFn
}

function getFn(urlWithQueryString) {
	return $.ajax({
		method: 'GET',
		xhrFields: {
			// withCredentials: true
		},
		url: urlWithQueryString
	});
}