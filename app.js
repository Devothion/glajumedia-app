const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Rutas API
const userRoutes = require("./src/routes/API/userRoutes");
const bannerRoutes = require("./src/routes/API/bannerRoutes");
const encuestaRoutes = require("./src/routes/API/encuestaRoutes");

// Rutas Admin
const indexWebRoutes = require("./src/routes/admin/indexWebRoutes");
const userWebRoutes = require("./src/routes/admin/userWebRoutes");
const bannerWebRoutes = require("./src/routes/admin/bannerWebRoutes");
const encuestaWebRoutes = require("./src/routes/admin/encuestaWebRoutes");

// Rutas Web
const indexRoutes = require("./src/routes/web/indexWebRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);

app.set("views", path.join(__dirname, "src", "views"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/api/users", userRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/encuestas", encuestaRoutes);

app.use("/admin", indexWebRoutes);
app.use("/admin/users", userWebRoutes);
app.use("/admin/banners", bannerWebRoutes);
app.use("/admin/encuestas", encuestaWebRoutes);

app.use("/", indexRoutes)

module.exports = app;