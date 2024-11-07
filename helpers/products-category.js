const ProductCategory = require("../models/product-category.model");

module.exports.getSubCategory = async (parentId) => {
    const getCategory = async (parentId) => {
        const subs = await ProductCategory.find({
            parent_id: parentId,
            status: "active",
            deleted: false
        });
    
        //console.log(subs);
        let allSub = [...subs];
        //console.log(allSub);
    
        for (const sub of subs) {
            const childs = await getCategory(sub.id);
            allSub = allSub.concat(childs);
        }
    
        //console.log(allSub);
        return allSub;
    }

    const result = await getCategory(parentId);
    return result;
}