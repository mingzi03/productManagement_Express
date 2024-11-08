const Cart = require("../../models/cart.model");

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
}