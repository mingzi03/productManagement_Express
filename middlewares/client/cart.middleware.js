const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    //console.log(req.cookies.cartId);

    if (!req.cookies.cartId) {
        //Tao gio hang
        const cart = new Cart();
        await cart.save();

        //console.log(cart);

        const expiresCookie = 365 * 24 * 60 * 60 * 1000;

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookie)
        });
    } else {
        //Chi lay ra thoi
    }
        

    next();
}