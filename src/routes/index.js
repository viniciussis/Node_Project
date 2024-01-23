import express from "express";
import booksRoutes from "../models/book.js";

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send("Welcome to my book storage!"));
  app.use(express.json(), booksRoutes)
}

export default routes