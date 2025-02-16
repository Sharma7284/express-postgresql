const { DataTypes, UUIDV4 } = require(`sequelize`);
const { sequelize } = require(`../config/db`);

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    employeeCode: {
      type: DataTypes.STRING(10),
      unique: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("phoneNumber");
        return rawValue ? Number(rawValue) : null;
      },
    },
    role: {
      type: DataTypes.ENUM("Loan Officer", "Underwriter", "Admin"),
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM("Loan Processing", "Customer Support"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Inactive",
    },
  },
  {
    timestamps: true,
    tableName: "employees",
  }
);

// Before creating an employee, generate a unique employeeCode
Employee.beforeCreate(async (employee) => {
  const lastEmployee = await Employee.findOne({
    order: [["createdAt", "DESC"]],
  });
  let newCode = "EMP001";
  if (lastEmployee && lastEmployee.employeeCode) {
    const lastCodeNumber = parseInt(
      lastEmployee.employeeCode.replace("EMP", ""),
      10
    );
    newCode = `EMP${String(lastCodeNumber + 1).padStart(3, "0")}`;
  }
  employee.employeeCode = newCode;
});

sequelize.sync({ alter: true });

module.exports = Employee;
