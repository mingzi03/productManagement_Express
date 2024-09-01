const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
//https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud

// Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret:  process.env.CLOUD_SECRET
});
// End Cloudinary

module.exports.upload =  (req, res, next) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                    resolve(result);
                    } else {
                    reject(error);
                    }
                }
                );
    
            streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
                // console.log(result);
                // console.log(result.secure_url);
                // console.log(req.file);
            req.body[req.file.fieldname] = result.secure_url;
            next();
        }
    
        upload(req);
    } else {
        next();
    }
}