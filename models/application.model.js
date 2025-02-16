const { DataTypes } = require(`sequelize`);
const { sequelize } = require(`../config/db`);
const User = require("./user.model");

const Application = sequelize.define(
  "Applications",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    loanType: {
      type: DataTypes.ENUM(
        "Personal Loan",
        "Home Loan",
        "Auto Loan",
        "Business Loan"
      ),
      allowNull: false,
    },
    loanAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("loanAmount");
        return rawValue ? +Number(rawValue).toFixed(2) : null;
      },
    },
    interestRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tenureMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected", "Disbursed"),
      defaultValue: "Pending",
    },
    applicationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    approvedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    repaymentStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    repaymentEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "applications",
  }
);

User.hasMany(Application, { foreignKey: "userId" });
Application.belongsTo(User, { foreignKey: "userId" });

// Sync with alter: true
// sequelize
//   .sync({ alter: true })
//   .then(() => console.log(`Database synced with new column`));

module.exports = Application;
