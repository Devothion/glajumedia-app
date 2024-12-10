const { User } = require("../../models");

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.render("admin/users/index", { users, layout: 'admin/layouts/layout' });
};

exports.createUser = async (req, res) => {
    res.render("admin/users/create", { layout: 'admin/layouts/layout' }); 
};

exports.storeUser = async (req, res) => {
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    res.redirect("/admin/users");
};

exports.editUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.render("admin/users/update", { user, layout: 'admin/layouts/layout' }); 
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await User.findByPk(id);
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    res.redirect("/admin/users");
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.redirect("/admin/users");
};

module.exports = exports;