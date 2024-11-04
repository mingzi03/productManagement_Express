const md5 = require("md5");
const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");

const Role = require("../../models/role.model")

// [GET] /admin/my-account/
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index", {
        pageTitle: "Thông tin cá nhân",
    });
};

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit", {
        pageTitle: "Chỉnh sửa thông tin cá nhân",
    });
};

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    //console.log(req.body);

    const id = res.locals.user.id;

    //Kiem tra account da ton tai email nay chua
    const emailExist = await Account.findOne({
        _id: { $ne: id },
        email: req.body.email,
        deleted: false
    });
    
    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        }
    
        //console.log(req.body);
    
        await Account.updateOne({ _id: id }, req.body);
    
        req.flash("success", "Cập nhật tài khoản thành công");
    }

    res.redirect("back");
};