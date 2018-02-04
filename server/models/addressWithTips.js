const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addrTipsSchema = new Schema ({
    tips: Array,
    restaurantname: {
        type: String
    },
    address: {
        type: String,
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: Number
    }
},{
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

const addrInfoTipsSchema = mongoose.model('addrTips', addrTipsSchema);
module.exports = {
    addrInfoTipsSchema
}