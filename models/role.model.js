const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
        title: String,
        description: String,
        permissions: {
            type: Array,      //Nhom quyen
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
        },
        
        deletedAt: Date
    }, {
        timestamps: true
    });

const Role = mongoose.model('Product', roleSchema, "products");

module.exports = Role;