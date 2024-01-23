import express from "express";
import connectDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
  console.error("Connection error: " + error);
});

connection.once("open", () => {
  console.log("Connection sucessfully");
});

const app = express();
routes(app);

export default app;