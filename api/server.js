import express from "express";
import cors from "cors";
import CountryRouter from "./routes/pais.js";
import UserRouter from "./routes/usuario.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pais", CountryRouter);

app.use("/api/users", UserRouter);

app.listen(9090, () => {
  console.log("Server is running on http://localhost:9090");
});

app.get("/", (req, res) => {
  res.send("Api World Cup");
});
