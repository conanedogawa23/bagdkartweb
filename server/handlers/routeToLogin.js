const adminSchema = require('../models/adminDetails'),
	driverSchema = require('../models/driverDetails'),
	bcrypt = require('bcryptjs'),
	newToken = require('./createToken');

const routeLogin = (req, res, next)=> {
	uname = req.body.username;
	pwd = req.body.password;

	const admin = adminSchema.adminDetails.findOne({
		aUname: uname
	},'aPwd', function(err, user){
		if(user) {
			const adminJSON = JSON.parse(JSON.stringify(user));
			if(err) return err;
			const validatePassword = user.comparePassword(pwd);
			if(!validatePassword) {
				console.log("enter correct password");
				res.json({ message: "enter correct password" });
			} else {
				const token = newToken.createToken(adminJSON);
				res.json({
					success: true,
					message: "Admin logged in",
					token: token,
					aData:uname
				});
			}
		} else {
			driverSchema.driverDetails.findOne({
				dUname: uname
			},'dPwd', function(err, driver){
				if(driver) {				
					const driverJSON = JSON.parse(JSON.stringify(driver));
					if(err) return err;
					const validatePassword = driver.comparePassword(pwd);
					if(!validatePassword) {
						console.log("enter correct password");
						res.json({ message: "enter correct password" });
					} else {
						const token = newToken.createToken(driverJSON);
						res.json({
							success: true,
							message: "driver logged in",
							token: token,
							dData:uname
						});
					}	
				} else {
					res.json({
						success: false,
						message: 'check the values'
					})
					console.log('check the values');
				}
			});
		}
	});
};

module.exports = {
	routeLogin
}