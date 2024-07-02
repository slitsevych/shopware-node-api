const axios = require('axios');
const Promise = require('bluebird');
const _ = require('lodash');

const rejectMissingUrl = () => Promise.reject(new Error('Missing url'));
const rejectMissingBody = () => Promise.reject(new Error('Missing body'));

module.exports = function ShopwareAPI({user, host, apiKey} = {}) {
  if (!user || !host || !apiKey) {
    const missing = _.keys(_.pickBy({user, host, apiKey}, _.negate(_.identity)));
    throw new Error(`Missing parameter${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
  }

  const instance = axios.create({
    baseURL: `${host}/api/`,
    headers: {
      'User-Agent': 'Shopware API Client',
      'Content-Type': 'application/json; charset=utf-8'
    },
    auth: {
      username: user,
      password: apiKey
    }
  });

  function _request(config) {
    return instance(config)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          return Promise.reject(new Error(`Request failed with status code ${error.response.status}`));
        }
        return Promise.reject(error);
      });
  }

  return {
    get(url, params = {}) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      return _request({url, method: 'GET', params});
    },

    post(url, data) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      if (_.isEmpty(data)) {
        return rejectMissingBody();
      }

      return _request({url, method: 'POST', data});
    },

    put(url, data) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      if (_.isEmpty(data)) {
        return rejectMissingBody();
      }

      return _request({url, method: 'PUT', data});
    },

    del(url) {
      if (_.isEmpty(url)) {
        return rejectMissingUrl();
      }

      return _request({url, method: 'DELETE'});
    }
  };
};
