import express from "express";
import bookController from "../controllers/bookController.js";

const booksRoutes = express.Router();

booksRoutes.get('/books', bookController.getBooks)
booksRoutes.get('/books/search', bookController.getBooksByPages)
booksRoutes.get('/books/:id', bookController.searchBook)
booksRoutes.post('/books', bookController.addBook)
booksRoutes.put('/books/:id', bookController.editBook)
booksRoutes.delete('/books/:id', bookController.deleteBook)

export default booksRoutes