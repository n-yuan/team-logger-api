const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Connect Database
connectDB();

//Define Routes
app.use("/api/logs", require("./routes/logs"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/members", require("./routes/members"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World"));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
