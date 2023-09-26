const winston = require('winston');
const logger = winston.createLogger({
	transports: [new winston.transports.Console()]
});

const Conection = {
	expressIgniter: (Express) => {
		Express.listen(2072, () => {
			logger.info('server is started on http://localhost:2072');
		});
	}
};

module.exports = Conection;
