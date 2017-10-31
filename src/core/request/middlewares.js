/**
 * BY-Health Official Website
 *
 * Copyright © 2016-2017 By-Health Co Ltd. All rights reserved.
 */

/**
 * Http middleware
 *
 * @export
 * @param {Promise} request
 * @returns {Promise}
 */
export function http(request) {
	return request.then(response => (
    // response.ok may be undefined
    response.status >= 200 && response.status < 300
      ? Promise.resolve(response.text())
      : Promise.reject(response)
  ));
}

/**
 * Json middleware
 *
 * @export
 * @param {Promise} request
 * @returns {Promise}
 */
export function json(request) {
	return request.then((responseText) => {
		const resp = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;

		if (resp.status === '0') {
			return Promise.resolve(resp.body);
		}

		return Promise.reject(resp);
	});
}

/**
 * RESTful middleware
 *
 * @export
 * @param {Promise} request
 * @returns {Promise}
 */
export function restful(request) {
	return request.then(response => response.text()
    .then(responseText => new Promise((resolve, reject) => {
	let resp;
	try {
		resp = JSON.parse(responseText);
	} catch (error) {
		resp = responseText;
	}
      // response.ok may be undefined
	return response.status >= 200 && response.status < 300 ? resolve(resp) : reject(resp);
},
  )));
}
