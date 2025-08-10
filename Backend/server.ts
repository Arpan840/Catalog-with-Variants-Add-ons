import express from "express";
import dotenv from "dotenv";
import cors from "cors";    
import router from "./routes/routes";
import db from "./src/db";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

app.use(cors());            // <-- enable CORS for all origins
app.use(express.json());    // parse JSON body

app.use("/api", router);

app.listen(port, () => {
  console.log("Server is running on port:", port);
  db();
});
