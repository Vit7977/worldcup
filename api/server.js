import express from "express";
import cors from "cors";
import CountryRouter from "./routes/pais.js";
import UserRouter from "./routes/user.js";
import GroupRouter from "./routes/group.js";
import PlayerRouter from "./routes/player.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/grupos", GroupRouter);

app.use("/api/pais", CountryRouter);

app.use("/api/users", UserRouter);

app.use("/api/players", PlayerRouter);

app.listen(9090, () => {
  console.log("Server is running on http://localhost:9090");
});

app.get("/", (req, res) => {
  res.send("Api World Cup");
});
