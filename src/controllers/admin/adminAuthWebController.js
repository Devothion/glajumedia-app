const passport = require("passport");

exports.showLogin = (req, res) => {
  res.render("admin/login/login", { layout: false });
};

exports.login = passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/admin/login",
  failureFlash: true,
});

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Sesión cerrada exitosamente");
    res.redirect("/");
  });
};

module.exports = exports;