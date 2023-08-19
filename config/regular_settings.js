const momentJs = require('moment-timezone');

module.exports = {

	getMoment(time){
		return momentJs(time);
	}
	
} 