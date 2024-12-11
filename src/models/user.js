const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

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

User.addHook("afterSync", async (options) => {
  try {
    const count = await User.count();
    if (count === 0) {
      await User.create({
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASSWORD,
      });
    }
  } catch (error) {
    console.error("Error en el hook afterSync:", error);
  }
});

User.beforeCreate(async (user) => {
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (error) {
    console.error("Error en el hook beforeCreate:", error);
  }
});

User.beforeUpdate(async (user) => {
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (error) {
    console.error("Error en el hook beforeUpdate:", error);
  }
});

module.exports = User;
