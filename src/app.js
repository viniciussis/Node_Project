import express from "express";
import connectDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handler404 from "./middlewares/handler404.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
  console.error("Connection error: " + error);
});

connection.once("open", () => {
  console.log("Connection sucessfully");
});

const app = express();
routes(app);
app.use(errorHandler);
app.use(handler404);

export default app;