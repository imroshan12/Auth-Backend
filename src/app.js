import connectToDB from "./config/db.js";
import express from "express";
import cors from 'cors';
import router from "./routes/index.js";

await connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Working");
});
app.use("/api/v1", router);

export default app;