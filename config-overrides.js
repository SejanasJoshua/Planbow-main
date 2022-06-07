const path = require('path');
module.exports = function override(config) {
	config.resolve = {
		...config.resolve,
		alias: {
			...config.alias,
			'@components': path.resolve(__dirname, 'src/components'),
			'@shared': path.resolve(__dirname, 'src/shared'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@redux': path.resolve(__dirname, 'src/redux'),
		},
	};
	return config;
};