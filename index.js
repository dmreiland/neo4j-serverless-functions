const nodeSvc = require('./services/node');
const edgeSvc = require('./services/edge');
const cudSvc = require('./services/cud');
const moment = require('moment');

/**
 * Executes a function, and if it throws an error, guarantees error response.
 * @param {*} aFunction function to execute
 * @param {*} res response object
 * @returns an export function
 */
const guaranteeResponse = (aFunction, failMsg = 'Error processing response') => {
  return (req, res) => {
    try {
      return aFunction(req, res);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        date: moment.utc().format(),
        message: failMsg,
        error: `${err}`,
      });
    }
  };
};

module.exports = {
  node: guaranteeResponse(nodeSvc),
  edge: guaranteeResponse(edgeSvc),
  cud: guaranteeResponse(cudSvc),
};
