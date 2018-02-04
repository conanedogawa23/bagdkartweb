const mongoose = require("mongoose"),
	schema = mongoose.Schema,
	bcrypt = require("bcryptjs");

const bills = new schema ({
	img: {
		data: Buffer,
		contentType: String
	},
	name:{
		type: String,
		required: true
	},
	time: {
		type: Date,
		default: Date.now()
	},
	resname: {
		type: String
	},
	address: {
		type: String
	},
	userID: {
		type: String,
		ref: 'driverDetails',
		required: true
	}
},{
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

const billDetails = mongoose.model("billDetails", bills);

module.exports = {
	billDetails
};