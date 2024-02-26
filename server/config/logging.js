const winston = require('winston');

// Source root documentation: https://github.com/winstonjs/winston/tree/2.x
const logger = winston.createLogger({
    level: 'info', // only logs of 'info' level and above will be recorded
    format: winston.format.json(), // declares the log format to JSON, making the logs structured and easier to process
    transports: [ // defines where the logs should be outputted to, known as 'transports'
        new winston.transports.File({ // will store logs of level 'error' and below
            filename: 'error.log', 
            level: 'error'}),
        new winston.transports.File({ // will capture logs of all levels
            filename: 'combined.log'
        })
    ]
})


module.exports = logger;