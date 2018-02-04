const mongo = require('mongodb').MongoClient,
    config = require('../../../config'),
    uri = config.db,
    multer = require('multer'),
    useMulter = multer().single('file');
const billSchema = require('../../models/billDetails'),
    orderSchema = require('../../models/order'),
    addressTips = require('../../models/addressWithTips');

const uploadImg = (req, res, next)=> {
    let value = [],
        fileName = [],
        fileTypes = [],
        imageInsert = {},
        order = {},
        counter = [];
    console.log(req.body);

    console.log(req.files);
    console.log(req.decoded.id);
    for (var i = 0; i < Object.keys(req.files).length; i++) {
        value [i] = `file${i}`;
        fileName[i] = req.files[value[i]].name;
        fileTypes[i] = req.files[value[i]].mimetype;
    }

    for (var i = 0; i < Object.keys(req.files).length; i++) {
        imageInsert = new billSchema.billDetails();
        imageInsert.name = fileName[i];
        imageInsert.img.data = req.files[value[i]].data;
        imageInsert.img.contentType = fileTypes[i];
        imageInsert.userID = req.decoded.id;
        imageInsert.resname = req.body.restaurantName;
        imageInsert.address = req.body.restaurantArea;
        counter[i]= imageInsert;
        // imageInsert.save()
        // .then((data)=> {
        //     return data;
        //     // console.log(data);
        // }).catch((err)=> {
        //     return err;
        //     // console.log(err);
        // })
    }
    console.log(counter);
    order = new orderSchema.orderSaving();
    order.order = counter;
    order.resname = req.body.restaurantName;
    order.address = req.body.restaurantArea;
    order.save().then((data)=> {
        console.log(data);
        res.json({
            success: true,
            message: 'image uploaded'
        });
    }).catch((err)=> {
        console.log(err);
    });
};

const uploadAddressImages = (req, res, next)=> {
    let addrTvalue = [],
        addrTfileName = [],
        addrTfileTypes = [],
        addrTimageInsert = {},
        addrTorder = {},
        addrTcounter = [];
    console.log(req.body);
    console.log(req.files);
    for (var i = 0; i < Object.keys(req.files).length; i++) {
        addrTvalue [i] = `file${i}`;
        addrTfileName[i] = req.files[addrTvalue[i]].name;
        addrTfileTypes[i] = req.files[addrTvalue[i]].mimetype;
    }

    for (var i = 0; i < Object.keys(req.files).length; i++) {
        addrTimageInsert = new billSchema.billDetails();
        addrTimageInsert.name = addrTfileName[i];
        addrTimageInsert.img.data = req.files[addrTvalue[i]].data;
        addrTimageInsert.img.contentType = addrTfileTypes[i];
        addrTimageInsert.userID = req.decoded.id;
        addrTcounter[i]= addrTimageInsert;
        // imageInsert.save()
        // .then((data)=> {
        //     return data;
        //     // console.log(data);
        // }).catch((err)=> {
        //     return err;
        //     // console.log(err);
        // })
    }
    console.log(addrTcounter);
    // order = new orderSchema.orderSaving();
    addrTorder = new addressTips.addrInfoTipsSchema();
    addrTorder.tips = addrTcounter;
    addrTorder.address = req.body.address1+'  ,  '+req.body.address2;
    addrTorder.city = req.body.city;
    addrTorder.state = req.body.state;
    addrTorder.zipcode = req.body.zipcode;
    addrTorder.save().then((data)=>{
        res.json({
            success: true,
            message: 'upload address images'
        });
    }).catch((err)=> {
        console.log(err);
    });

};

module.exports = {
    uploadImg,
    uploadAddressImages
}