import express from "express";
import authorController from "../controllers/authorController.js";

const authorsRoutes = express.Router();

authorsRoutes.get('/authors', authorController.getAuthors)
authorsRoutes.get('/authors/:id', authorController.searchAuthor)
authorsRoutes.post('/authors', authorController.addAuthor)
authorsRoutes.put('/authors/:id', authorController.editAuthor)
authorsRoutes.delete('/authors/:id', authorController.deleteAuthor)

export default authorsRoutes