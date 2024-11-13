const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

// [GET] /cart/add/
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
    
    res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart
    });
};

// [POST] /cart/add/:productId
module.exports.addPost = async (req,res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    // console.log(productId);
    // console.log(quantity);
    // console.log(cartId);

    const cart = await Cart.findOne({
        _id: cartId
    });
    //console.log(cart.products);

    const existProductInCart = cart.products.find(item => item.product_id == productId);
    //console.log(existProductInCart);

    if (existProductInCart) {
        const quantityNew = quantity + existProductInCart.quantity;
        //console.log(quantityNew);

        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        }, {
            $set: {
                "products.$.quantity": quantityNew
            }
        });
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        };
    
        await Cart.updateOne({
            _id: cartId
        }, {
            $push: { products: objectCart }
        });
    }

    req.flash("success", "Thêm giỏ hàng thành công");

    res.redirect("back");
};