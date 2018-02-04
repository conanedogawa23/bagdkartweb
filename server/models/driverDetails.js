const mongoose = require("mongoose"),
	schema = mongoose.Schema,
	bcrypt = require("bcryptjs");

const driver = new schema ({
	dUname: {
		type: String,
		index: {
			unique: true
		},
		required: true,
	},
	dPwd: {
		type: String,
		required: true,
		select: false
	},
	dEmail: {
		type: String,
		index: {
			unique: true
		},
		required: true
	},
	dFname: {
		type: String,
	},
	dLname: {
		type: String,
	},
	dMobile: {
		type: Number,
		max: 13
	},
	date: {
		type:Date,
		default: Date.now()
	},
	area:{
		type: String,
		required: true,
		default: 'None'
	},
	phone:{
		type: Number,
		required: true
	}
},{
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

driver.pre('save', function(next){
	let driverInfo = this;
	console.log(`${driverInfo} is the info passed from register`);
	bcrypt.hash(driverInfo.dPwd, 10).then((hash) => {
        driverInfo.dPwd = hash; //if there is no error we are going to hash
        console.log("authenticate as driver");
        next();
    }).catch((err) => {
    	console.log(`password not hashed :${err}`);
    });
});

driver.methods.comparePassword = function(pwd){
	let dInfo = this;
	return bcrypt.compareSync(pwd, dInfo.dPwd);
};

const driverDetails = mongoose.model("driverDetails", driver);

module.exports = {
	driverDetails
};