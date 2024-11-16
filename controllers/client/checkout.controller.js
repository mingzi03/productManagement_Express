const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
const Order = require("../../models/order.model");

// [GET] /checkout/
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    });
    //console.log(cart);

    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId,
            }).select("title thumbnail slug price discountPercentage");

            productInfo.priceNew = productsHelper.priceProduct(productInfo);

            item.productInfo = productInfo

            item.totalPrice = productInfo.priceNew * item.quantity;
        }
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum +  item.totalPrice, 0);

    res.render("client/pages/checkout/index", {
        pageTitle: "Đặt hàng",
        cartDetail: cart,
    });
}

// [POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;

    //console.log(req.body);
    const userInfo = req.body;

    const cart = await Cart.findOne({
        _id: cartId
    });

    const products = [];
    for (const product of cart.products) {
        const objectProduct ={
            product_id: product.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: product.quantity
        };

        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("price discountPercentage");

        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objectProduct);

    }

    // console.log(cartId);
    // console.log(userInfo);
    // console.log(products);

    const orderInfo = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products,
    };

    const order = new Order(orderInfo);
    order.save();

    await Cart.updateOne({
        _id: cartId
    }, {
        products: []
    });

    res.redirect(`/checkout/success/${order.id}`);
}

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
    console.log(req.params.orderId);

    res.render("client/pages/checkout/success", {
        pageTitle: "Đặt hàng thành công",
    });
}