const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer  = require("multer");
require('dotenv').config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express();

const port = process.env.PORT;

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// flash
app.use(cookieParser("PRODUCTMANAGEMENTMINGZI03"));
app.use(session({ cookie: { maxAge: 60000 }}));
//app.use(session({ secret: "PRODUCTMANAGEMENTMINGZI03", resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } }));
app.use(flash());

// TinyMCE: Thư viện soạn thảo text như word
app.use('/tinymce', express.static(path.join(__dirname, "node_modules", "tinymce")));

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// console.log(__dirname);  // Cấu trúc thư mục NodeJs
app.use(express.static(`${__dirname}/public`));

// Routes
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});