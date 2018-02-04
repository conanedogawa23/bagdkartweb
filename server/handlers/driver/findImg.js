const mongo = require('mongodb').MongoClient,
    server = require('../../../server'),
    // config = require('../../../config'),
    // url = config.db,
    // uri = server.mongoDbUrl,
    orderSchema = require('../../models/order');

const findImg = (req, res, next)=> {
    // console.log(req.body);
    let date = Date.parse(req.body.date);
    let end = Date.now();
    console.log(`${date}, ${end}`);
    let image = [];
    let poppedImages = [];
    let imageType = [];
    let imagesView = [];
    orderSchema.orderSaving.find({
        resname: req.body.restaurant,
        created_at: {
            $gte: date,
            $lte: end
        } 
    }).then((data)=> {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            // image[index] = data[index];
            // console.log(data[index].order.length);
            for (let imgIndex = 0; imgIndex < data[index].order.length; imgIndex++) {
                imagesView[imgIndex] = data[index].order[imgIndex].img.data.toString('base64');;
                // console.log(imagesView);
                // .data.toString('base64');                
                imageType[imgIndex] = data[index].order[imgIndex].img.contentType;
                imagesView[imgIndex] = `data:${imageType[imgIndex]};base64,`+imagesView[imgIndex];
                // console.log(image);
                // console.log(imgIndex);
                image.push(imagesView.pop());
            }
            // for(let img = 0; img < imagesView.length; img++) {
            //     poppedImages.push(imagesView.pop());
            // }
        }

        // console.log(image);
        // image = data;
        // imagesView = data[0].order[0].address;
        // console.log(imagesView);
        // console.log(data.length);
        res.json({
            success: true,
            message: 'received images',
            data: image
        });
    }).catch((err)=>{
        console.log(err);
    });
    // orderSchema.orderSaving.find({
    //     "created_at":{
    //         $gte: date,
    //         $lte: end
    //     }
    // }).then((data)=> {
    //     console.log(data);
    // })

    // mongo.connect(uri, (err, db)=> {
    //     if(err) return err;
    //     // console.log("mongo connected");
    //     db.collection('billdetails').find({
    //         time: "2018-01-06T05:05:54.402Z"
    //     }).toArray().then((data)=>{
    //         // console.log(data);
    //         let obj = [];
    //         obj = data;
    //         console.log(obj);
    //         res.json({
    //             success: true,
    //             message: 'received images',
    //             data: obj
    //         });
    //     });
    // });
    // res.json({
    //     success: true,
    //     message: 'received images',
    //     // data: obj
    // });
};

module.exports = {
    findImg
}