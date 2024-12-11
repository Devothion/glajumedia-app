const { User } = require("../../models");

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.render("admin/users/index", { users, layout: 'admin/layouts/layout' });
};

exports.createUser = async (req, res) => {
    res.render("admin/users/create", { layout: 'admin/layouts/layout' }); 
};

exports.storeUser = async (req, res) => {
    const { username, password, password_confirm } = req.body;
    if (password !== password_confirm) {
        return res.redirect("/admin/users/create");
    }
    await User.create({ username, password });
    res.redirect("/admin/users");
};

exports.editUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.render("admin/users/update", { user, layout: 'admin/layouts/layout' }); 
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, password_confirm } = req.body;
    if (password !== password_confirm) {
        return res.redirect(`/admin/users/update/${id}`);
    }
    const user = await User.findByPk(id);
    user.username = username;
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