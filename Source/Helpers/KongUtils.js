const Config = require('../App/Config');
const request = require('request');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const KongUtils = {

    /**
     * Create kong consumer
     * @returns {Promise<{error: boolean, message: string}>}
     * @param id
     * @param callback
     */
    createUserAndTokenInKong: (id, callback) => {
        let options = {
            url: Config.KONG_URL.KONG,
            form: {
                username: id
            },
            method: 'POST'
        };
        request.post(options, (err, data) => {
            console.log(err);
            if (!err) KongUtils.generateAuthToken(id, callback);
            else if (callback) callback(null);
        });
    },
    /***
     *
     * @param user
     * @param callback
     */
    generateAuthToken: (user, callback) => {
        let exp = moment().add(1, 'days').unix();
        request.post(
            {
                url: Config.KONG_URL.KONG + user + '/jwt',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            (err, response, body) => {
                if (body) {
                    let bodyResponse = JSON.parse(body);
                    try {
                        let token = jwt.sign(
                            {
                                iss: bodyResponse.key,
                                exp: exp
                            },
                            bodyResponse.secret
                        );
                        callback(token, body);
                    } catch (err) {
                        console.log('Exception from generateAuthToken' + err.message);
                        callback(null, {});
                    }
                } else callback(null, {});
            }
        );
    }
};
module.exports = KongUtils;
