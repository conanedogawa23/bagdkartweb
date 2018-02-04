const jwt = require('jsonwebtoken'),
	config = require('../../config'),
	secretKey = config.secretKey;
console.log("in createToken");
const createToken = (user) => {
	const token = jwt.sign({
		id: user._id,
		username: user.username,
		lastname: user.lastname
	}, secretKey);
	return token;
};

module.exports = {
	createToken
};