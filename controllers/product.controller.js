const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.all = function (req, res) {
    Product.find({}).then(function (products) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(products);
      });

};

exports.product_create = function (req, res) {
    console.log(req.body)
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.send('Product Created successfully')
    })
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.header("Access-Control-Allow-Origin", "*");
        res.send('Deleted successfully!');
    })
};