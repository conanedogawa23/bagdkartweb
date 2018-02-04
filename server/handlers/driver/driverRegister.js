const driverRegister = require("../../models/driverDetails");

const driverSignup = (req, res, next)=>{
	const driverUser = new driverRegister.driverDetails(),
		err = req.validationErrors();

	let uname = req.body.username,
		pwd = req.body.password,
		email = req.body.email,
		fname = req.body.fname,
		lname = req.body.lname;
		area = req.body.area;
		phone = req.body.phone;
		conpwd = req.body.conpassword;

	req.checkBody('username','username must not be empty').notEmpty();
	req.checkBody('password','password must not be empty').notEmpty();
	req.checkBody('email','email must not be empty').notEmpty();
	req.checkBody('email','email must be of a type').isEmail();
	req.checkBody('fname','fname must not be empty').notEmpty();
	req.checkBody('lname','lname must not be empty').notEmpty();
	req.checkBody('area','area must not be empty').notEmpty();
	req.checkBody('phoneNumber','area must not be empty').notEmpty();
	req.checkBody('conpassword','must match password').notEmpty();

	if(err) {
		res.status(400).send({ "message": "Missing parameter or error in parameter" });
	} else {
		driverUser.dUname = uname;
		driverUser.dPwd = pwd;
		driverUser.dEmail = email;
		driverUser.dFname = fname;
		driverUser.dLname = lname;
		driverUser.area = area;
		driverUser.phone = phone;
		if(pwd===conpwd) {
			driverUser.save().then((data)=> {
				res.json({
					message: 'successful operation',
					success: true
				});
				console.log(data);
			}).catch((err)=> {
				res.json({
					message: 'unsuccessful operation',
					success: false
				});
				console.log(err);
			});
		} else {
			console.log("not registered");
			res.json({
				message: 'unsuccessful operation',
				success: false
			});
		}
	}
};

module.exports = {
	driverSignup
}