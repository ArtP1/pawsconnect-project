const client = require('../config/database');


const catchAsync = (fn) => async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      res.status(500).json({message: "Oops! Something went wrong on our end."});
    }
};

const executeQuery = async (query, params = []) => {
    try {
        const { rows, fields } = await client.query(query, params);
        return rows;
    } catch (err) {
        throw err;
    }
}


module.exports = {
  catchAsync,
  executeQuery
};