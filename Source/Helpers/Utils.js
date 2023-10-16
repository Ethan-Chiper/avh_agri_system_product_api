const {customAlphabet} = require('nanoid');
const moment = require('moment');
const Request = require('request');

const Utils = {
	/**
	 * To Get User ID and Role
	 * @param consumerUsername
	 * @returns {string[]}
	 */
	getIdAndRole: (consumerUsername) => {
		return (consumerUsername || '').split('_');
	},
	/**
	 * getNanoId
	 * @returns
	 */
	getNanoId: () => {
		let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		let randomId = customAlphabet(alphabet, 10);
		return randomId();
	},

	/**
	 * Integer Value
	 * @returns
	 */
	number: () => {
		let alphabet = '1234567890';
		let uniqueId = customAlphabet(alphabet, 12);
		return uniqueId();
	},

	/**
	 * Today Date
	 * @returns
	 */
	todayDate: () => {
		return moment().format('YYYY-MM-DD');
	},

	/**
	 * End Date
	 * @returns
	 */
	endDate: () => {
		let endDate = moment().subtract(1, 'day').add(1, 'year').format('YYYY-MM-DD');
		return endDate;
	},
	/**
	 * Function for checking whether the data is empty
	 * @param data
	 * @returns {boolean}
	 */
	isEmpty: (data) => {
		if (data === null || data === undefined) {
			return true;
		}
		if (typeof data === 'string' && data.replace(/ /g, '').length > 0) {
			return false;
		}
		if (typeof data === 'number') {
			return false;
		}
		if (typeof data === 'boolean') {
			return false;
		}
		if (Array.isArray(data) && data.length > 0) {
			return false;
		}
		if (typeof data === 'object' && Object.keys(data).length > 0) {
			return false;
		}
		return true;
	},
	/***
	 * date option
	 */
	dateFinder: (data) => {
		let query = {};
		let toDate = Moment().endOf('day').toDate();
		let previousDay = Moment().startOf('day').subtract(1, 'day').toDate();
		let thisWeek = Moment().startOf('week').toDate();
		let thisMonth = Moment().startOf('month').toDate();
		let thisYear = Moment().startOf('year').toDate();

		if (data?.date_option) {
			let fromDate;
			switch (data?.date_option) {
				case 'weekly': {
					fromDate = thisWeek;
					query = {$gte: fromDate, $lte: toDate};
					break;
				}
				case 'monthly': {
					fromDate = thisMonth;
					query = {$gte: fromDate, $lte: toDate};
					break;
				}
				case 'yearly': {
					fromDate = thisYear;
					query = {$gte: fromDate, $lte: toDate};
					break;
				}
				case 'yesterday': {
					fromDate = previousDay;
					toDate = Moment().endOf('day').subtract(1, 'day').toDate();
					query = {$gte: fromDate, $lt: toDate};
					break;
				}
				default: {
					fromDate = new Date(Moment().startOf('day'));
					query = {$gte: fromDate, $lte: toDate};
					break;
				}
			}
		}
		if (data?.from_time) {
			let startTime = new Date(data?.from_time);
			startTime.setHours('00');
			startTime.setMinutes('00');
			startTime.setSeconds('00');
			query = {$gte: startTime};
		}

		if (data?.to_time) {
			let endTime = new Date(data?.to_time);
			endTime.setHours('23');
			endTime.setMinutes('59');
			endTime.setSeconds('59');
			query = {$lte: endTime};
		}

		if (data?.from_time && data?.to_time) {
			let startTime = new Date(data?.from_time);
			startTime.setHours('00');
			startTime.setMinutes('00');
			startTime.setSeconds('00');

			let endTime = new Date(data?.to_time);
			endTime.setHours('23');
			endTime.setMinutes('59');
			endTime.setSeconds('59');

			query = {$gte: startTime, $lt: endTime};
		}

		return query;
	},
	/**
	 * network call
	 * @param {*} options 
	 * @returns 
	 */
	networkCall: async (options) => {
		try {
			let postData = {};

			if (Utils.isEmpty(options?.url)) {
				return {
					error: 'please provide a url',
					message: undefined
				};
			}
			postData['url'] = options?.url;
			postData['timeout'] = options?.timeout || 120_000;

			// headers prepare for http request
			if (Utils.isEmpty(options?.headers)) {
				postData['headers'] = {
					'Content-Type': 'application/json'
				};
			} else {
				let headers = {'Content-Type': 'application/json'};
				for (let key in options?.headers) {
					// eslint-disable-next-line security/detect-object-injection
					headers[key] = options?.headers[key];
				}
				postData['headers'] = headers;
			}

			// to decide method for http request
			postData['method'] = options?.method || 'GET';

			if (!Utils.isEmpty(options?.body)) {
				try {
					postData['body'] = JSON.stringify(options?.body);
				} catch (error) {
					return {error: 'unable to stringify body'};
				}
			}

			if (!Utils.isEmpty(options?.formData)) {
				postData['formData'] = options?.formData;
			}

			if (options?.admin) {
				postData['headers']['x-consumer-username'] = 'admin_' + options.admin?.id;
			}

			// FORM data handling
			if (!Utils.isEmpty(options?.form)) {
				postData['form'] = options?.form;
			}
			let errorData;
			let bodyData;
			await new Promise((resolve) => {
				Request(postData, (error, response, body) => {
					errorData = error;
					bodyData = body;
					resolve(error, response, body);
				});
			});
			return {error: errorData, body: bodyData};
		} catch (error) {
			return {error: error, message: 'Something went wrong' || error?.message};
		}
	},
};

module.exports = Utils;
