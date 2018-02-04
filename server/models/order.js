const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSave = new Schema ({
    order: Array,
    resname: {
		type: String
	},
	address: {
		type: String
	},
},{
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

const orderSaving = mongoose.model('orderInstance', orderSave);

module.exports = {
    orderSaving
}