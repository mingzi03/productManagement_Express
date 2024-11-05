const Product = require("../../models/product.model");

const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/products");

const productsCategoryHelper = require("../../helpers/products-category");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});

    const newProducts = productsHelper.priceNewProducts(products);

    //console.log(newProducts);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    });
};


// [GET] /products/:slug
module.exports.detail = async (req, res) => {
        // console.log(req.params.slug);
    
    try {
        const find = { deleted: false, slug: req.params.slug, status: "active" };

        const product = await Product.findOne(find);
            console.log(product);

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`/products`);
    }
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    //console.log(req.params.slugCategory);
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        status: "active",
        deleted: false
    });

    const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
    //console.log(listSubCategory);

    const listSubCategoryId = listSubCategory.map(item => item.id);
    //console.log(listSubCategoryId);

    //console.log(category.id);
    const products = await Product.find({
        product_category_id: { $in: [category.id, ...listSubCategoryId]},
        deleted: false
    }).sort({ position: "desc" });

    const newProducts = productsHelper.priceNewProducts(products);

    //console.log(products);
    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts
    });
};