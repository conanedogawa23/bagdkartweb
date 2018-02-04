const mongoose = require("mongoose"),
	schema = mongoose.Schema,
	bcrypt = require("bcryptjs");

const admin = new schema ({
	aUname: {
		type: String,
		index:{
			unique: true
		},
		required: true
	},
	aPwd: {
		type: String,
		index:{
			unique: true
		},
		required: true,
		selected: false
	},
	aEmail: {
		type: String,
		index: {
			unique: true
		},
		required: true
	},
	aFname: {
		type: String,
	},
	aLname: {
		type: String,
	},
},{
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

admin.pre('save', function(next){
	let adminInfo = this;
	bcrypt.hash(adminInfo.aPwd, 10).then((hash) => {
        adminInfo.aPwd = hash; //if there is no error we are going to hash
        console.log("authenticate as admin");
        next();
    }).catch((err) => {
    	console.log("password not hashed :"+err);
    });
});

admin.methods.comparePassword = function(pwd){
	let aInfo = this;
	return bcrypt.compareSync(pwd, aInfo.aPwd);
};

const adminDetails = mongoose.model("adminDetails", admin);

module.exports = {
	adminDetails
};