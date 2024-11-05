const ProductCategory = require("../../models/product-category.model");

const Product = require("../../models/product.model");

const createTreeHelper = require("../../helpers/createTree");

const productsHelper = require("../../helpers/products");

// [GET] /
module.exports.index = async (req,res) => {
    //Lay ra san pham noi bat
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(3);  //.limit(number): gioi han so san pham render ra giao dien
    //console.log(productsFeatured);
    const newProducts = productsHelper.priceNewProducts(productsFeatured);
    //End lay ra san pham noi bat

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured: newProducts
    });
}