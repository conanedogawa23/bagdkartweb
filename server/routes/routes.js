const jwt = require("jsonwebtoken"),
	config = require("../../config"),
	secretKey = config.secretKey,
	// driverLogin = require("../handlers/driver/driverLogin"),
	driverRegister = require("../handlers/driver/driverRegister"),
	adminRegister = require("../handlers/admin/adminRegister"),
	cors = require('cors'),
	// adminLogin = require("../handlers/admin/adminLogin"),
	routesInLogin = require("../handlers/routeToLogin"),
	uploadImageDriver = require('../handlers/driver/uploadImg'),
	findImage = require('../handlers/driver/findImg'),
	getInfo = require('../handlers/driver/getImageInfo'),
	expressValidator = require('express-validator');

module.exports = (app, express)=> {
const api = express.Router();
api.use(expressValidator());
api.options('*',cors());

api.get("/",(req, res, next)=> {
	if(res.headersSent){
		res.json(`test successful`);
		console.log("sent headers");
	} else {
		res.json(`test unsuccessful`);
		console.log("didnt sent headers");
	}
});

api.post('/test', (req, res,next)=> {
	let test = req.body.test;
	res.json(test);
});

api.post('/routeToLogin', routesInLogin.routeLogin);

// api.post('/adminLogin', adminLogin.adminSignin);

api.post('/adminRegister', adminRegister.adminSignup);

// api.post('/driverLogin', driverLogin.driverSignin);

api.post('/driverRegister', driverRegister.driverSignup);

api.use((req, res, next)=> {
	const token = req.query.token;
	console.log(token);
	if(token) {
		jwt.verify(token, secretKey, function(err, decoded){
			if(err) {
				res.status(403).send({ success: false, message: "failed to authenticate"});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(403).send({ success: false, message: "no token generated"});
	}
});

api.post("/trail",(req, res, next)=>{
	res.json(req.decoded);
});

api.post('/driverAddressUpload', uploadImageDriver.uploadAddressImages);

api.post('/driverImgUpload', uploadImageDriver.uploadImg);

api.post('/getInfo', getInfo.getInfoFile);

api.post('/driverImgFind', findImage.findImg);

return api;
}