require("dotenv").config();
const express = require("express");
const route = require("./src/routes");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use("/api/", route);

app.listen(port, () => {
   console.log(`listening on port ${port}`);
});
