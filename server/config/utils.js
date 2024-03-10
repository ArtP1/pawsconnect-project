const client = require('../config/database');
const { sendResponse } = require('./responseHandler');


const catchAsync = (fn) => async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      sendResponse(res, 500, null, "Oops! Something went wrong on our end.");
    }
};

const executeQuery = async (query, params = []) => {
  try {
      const { rows } = await client.query(query, params);
      return rows;
  } catch (err) {
      console.error(`Query Error: ${err.message}`);
      console.error(`Query: ${query}`);
      console.error(`Params: ${params}`);
      throw err;
  }
}


module.exports = {
  catchAsync,
  executeQuery
};