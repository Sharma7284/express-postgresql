require(`dotenv`).config();
const express = require(`express`);
const cors = require(`cors`);
const helmet = require(`helmet`);
const morgan = require(`morgan`);

const routes = require(`./routes/index`);
const { connectDB } = require(`./config/db`);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan(`dev`));

// Routes
app.use(`/api`, routes);

// Database Connection
connectDB()
  .then(() => console.log(`Database Connected`))
  .catch((err) => console.error(`Database Connection Failed`, err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
