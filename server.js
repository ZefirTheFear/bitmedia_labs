const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(cors());

app.use("/users", userRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on ${port}`));
