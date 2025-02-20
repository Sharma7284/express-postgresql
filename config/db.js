const { Sequelize } = require(`sequelize`);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, //Disable logging for production
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ logging: console.log, force: false });
    console.log(`PostgreSQL Connected`);
  } catch (error) {
    console.error(`Database Connection Error`, error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
