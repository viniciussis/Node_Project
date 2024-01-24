import express from "express";
import bookController from "../controllers/bookController.js";
import paging from "../middlewares/paging.js";

const booksRoutes = express.Router();

booksRoutes.get("/books", bookController.getBooks, paging);
booksRoutes.get("/books/search", bookController.getBooksByFilter);
booksRoutes.get("/books/:id", bookController.searchBook);
booksRoutes.post("/books", bookController.addBook);
booksRoutes.put("/books/:id", bookController.editBook);
booksRoutes.delete("/books/:id", bookController.deleteBook);

export default booksRoutes;