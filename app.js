const bodyParser = require("body-parser");
const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);

app.listen(port, () => {
    console.log("listening");
})