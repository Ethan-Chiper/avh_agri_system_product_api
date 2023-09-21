const {customAlphabet} = require('nanoid');
const moment = require('moment');

const Utils = {
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
	}
};

module.exports = Utils;
