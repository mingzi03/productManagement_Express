module.exports = (query) => {
    let objectSearch = {
        keyword: "",
    }

    if(query.keyword) {
        objectSearch.keyword = query.keyword;

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
        // "i": không phân biệt chữ hoa, chữ thường
        const regex = new RegExp(objectSearch.keyword, "i"); 
        objectSearch.regex = regex;
    }

    return objectSearch;
}