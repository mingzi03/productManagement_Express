const Product = require("../../models/product.model");

const systemConfig = require("../../config/system");

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search");

const paginationHelper = require("../../helpers/pagination");


// [GET] /admin/products
module.exports.index = async (req,res) => {
    // console.log(req.query.status);

    // Bộ lọc bên trong helpers

    const filterStatus = filterStatusHelper(req.query);
        // console.log(filterStatus);

    // End bộ lọc trong helpers

    // Định nghĩa object là 1 bộ lộc
    let find = {
        deleted: false,
    };

    if(req.query.status) {
        find.status = req.query.status;
    }

    // Tìm kiếm
    const objectSearch = searchHelper(req.query);

        // console.log(objectSearch);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    // End tìm kiếm

    // Phân trang(Pagination)
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 4
        },
        req.query,
        countProducts
    );
    
    // End phân trang


    // Truy vấn dữ liệu trong database
    const products = await Product.find(find)
                                    .sort({position: "desc"})
                                    .limit(objectPagination.limitItems)
                                    .skip(objectPagination.skip);

        // console.log(products);

    // Phần truyền dữ liệu ra Views
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}


// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) => {
        //console.log(req.params);

    const status = req.params.status;

    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});

    req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");

    res.redirect("back");
};


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {
        // console.log(req.body);
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active"});
            req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive"});
            req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany( { _id: { $in: ids } }, { deleted: true, deletedAt: new Date() } );
            req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":
                //console.log(ids);
            for (const item of ids) {
                // console.log(item);

                let [id, position] = item.split("-");
                    // console.log(id);
                    // console.log(position);

                position = parseInt(position);
                await Product.updateOne( {  _id: id }, { position: position });
                
            }
            //await Product.updateMany( { _id: { $in: ids } }, { deleted: true, deletedAt: new Date() } );
            req.flash("success", `Thay đổi thành công vị tri ${ids.length} sản phẩm!`);
            break;
        default:
            break;
}

        // console.log(type);
        // console.log(ids);

    res.redirect("back");

};


// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req,res) => {
    //console.log(req.params);

    const id = req.params.id;

        // await Product.deleteOne({ _id: id }); // Xoa vinh vien
    await Product.updateOne( { _id: id }, {   deleted: true, deletedAt: new Date() });  // Xoa mem

    req.flash("success", `Đã xóa thành công sản phẩm!`);

    res.redirect("back");
};


// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
    });
};


// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
        // console.log(req.body);

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
            // console.log(countProducts);
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    await product.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};


// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
        // console.log(req);
        // console.log(req.params.id);
    
        try{
            const find = { deleted: false, _id: req.params.id };

            const product = await Product.findOne(find);
            // console.log(product);

            res.render("admin/pages/products/edit", {
                pageTitle: "Chỉnh sửa sản phẩm",
                product: product
            });
        } catch(error) {
            res.redirect(`${systemConfig.prefixAdmin}/products`);
        }
};


// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
        // console.log(req.body);

        const id = req.params.id;

        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.position = parseInt(req.body.position);
            // console.log(req.body);
        
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
    
        try {
            await Product.updateOne({ _id: id}, req.body);
            req.flash("success", `Cập nhật thành công!`);
        } catch(error) {
            req.flash("error", `Cập nhật thất bại!`);
        }
        
        res.redirect("back");
};


// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    // console.log(req);
    // console.log(req.params.id);

    try{
        const find = { deleted: false, _id: req.params.id };

        const product = await Product.findOne(find);
            // console.log(product);

        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};