const express = require("express");
const session = require("express-session");
const passport = require("./src/config/passport");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const path = require("path");
const i18n = require("./src/config/i18n");
const cookieParser = require("cookie-parser");
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
const brandWebRoutes = require("./src/routes/admin/brandWebRoutes");
const authRoutes = require("./src/routes/admin/adminAuth");

// Rutas Web
const indexRoutes = require("./src/routes/web/indexWebRoutes");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar Passport y sesiones
app.use(passport.initialize());
app.use(passport.session());

// Flash para mensajes
app.use(flash());

// Middleware global para mensajes flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(cookieParser());
app.use(i18n.init);

// Middleware para cambiar de idioma
app.use((req, res, next) => {
  const lang = req.query.lang || req.cookies.locale;
  if (lang) {
    res.cookie("locale", lang, { maxAge: 900000, httpOnly: true });
    req.setLocale(lang);
  }
  next();
});

app.use((req, res, next) => {
  if (!req.cookies.locale) {
    const lang = req.acceptsLanguages("en", "es") || "en";
    res.cookie("locale", lang, { maxAge: 900000, httpOnly: true });
    req.setLocale(lang);
  }
  next();
});

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
app.use("/admin", authRoutes);
app.use("/admin/users", userWebRoutes);
app.use("/admin/banners", bannerWebRoutes);
app.use("/admin/encuestas", encuestaWebRoutes);
app.use("/admin/brands", brandWebRoutes);

app.use("/", indexRoutes);

module.exports = app;
