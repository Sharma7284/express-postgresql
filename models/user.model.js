const { DataTypes } = require(`sequelize`);
const { sequelize } = require(`../config/db`);

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
      },
      get() {
        const rawValue = this.getDataValue("phoneNumber");
        return rawValue ? Number(rawValue) : null;
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    address: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        address1: null,
        address2: null,
        city: null,
        landmark: null,
        state: null,
        country: null,
        pincode: null,
      },
    },
    panNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    aadharNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
      get() {
        const rawValue = this.getDataValue("aadharNumber");
        return rawValue ? Number(rawValue) : null;
      },
    },
    isAadharKYC: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isPanKYC: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    timestamps: true,
    tableName: "users",
  }
);

module.exports = User;
