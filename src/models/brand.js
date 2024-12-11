const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Brand = sequelize.define("Brand", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    colorCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Brand.addHook('afterSync', async (options) => {
    const count = await Brand.count();
    if (count === 0) {
        await Brand.create({
            nombre: "Brand Glajumedia",
            logoUrl: "/images/logo_glajumedia.svg",
            colorCode: "#48c6ef",
        });
    }
})

module.exports = Brand;