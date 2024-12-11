const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.addHook("afterSync", async (options) => {
  const count = await User.count();
  if (count === 0) {
    await User.create({
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASSWORD,
    });
  }
});

module.exports = User;
