import express from "express";
import cors from "cors";
import MainRoute from "./routes/MainRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(UserRoute);
app.use(MainRoute);

app.listen(5000, () => console.log('Server Tanggap App is Online'));