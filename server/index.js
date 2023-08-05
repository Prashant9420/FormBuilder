const express = require("express");
const routes = require("./router/routes.js");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://graceful-kitsune-a7ba8d.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*"],
  })
);

app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
  return res.send("hi from server");
});
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
