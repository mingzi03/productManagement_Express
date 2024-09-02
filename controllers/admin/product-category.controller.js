const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/products-category
module.exports.index = async (req,res) => {
    let find = {
        deleted: false,
    };

    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    // Phần truyền dữ liệu ra Views
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    });
}


// [GET] /admin/products-category/create
module.exports.create = async (req,res) => {
    let find = {
        deleted: false
    };

    const records = await ProductCategory.find(find);
            // console.log(records); 

    const newRecords = createTreeHelper.tree(records);
            // console.log(newRecords);   // Bật console của NodeJs trên trình duyệt, mở thuộc tính children
    
    // Phần truyền dữ liệu ra Views
    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    });
}


// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
        // console.log(req.body);

    if (req.body.position == "") {
        const count = await ProductCategory.countDocuments();
                // console.log(count);

        req.body.position = count + 1;
    } else {
            req.body.position = parseInt(req.body.position);
        }

    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

