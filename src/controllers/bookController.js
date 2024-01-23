import NotFound from "../errors/NotFound.js";
import { author } from "../models/author.js";
import book from "../models/book.js";

class bookController {

  static async getBooks(req, res, next) {
    try {
      const booksList = await book.find();
      res.status(200).json(booksList);
    } catch (error) {
      next(error);
    }
  }

  static async searchBook(req, res, next) {
    try {
      const bookFinded = await book.findById(req.params.id);
      if (bookFinded !== null) {
        res.status(200).json(bookFinded);
      } else {
        next(new NotFound("Id do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async addBook(req, res, next) {
    const newBook = req.body;
    try {
      const authorFinded = await author.findById(newBook.author);
      if (authorFinded !== null) {
        const bookCreated = { ...newBook, author: { ...authorFinded._doc } };
        await book.create(bookCreated);
        res.status(201).json({ message: "Livro cadastrado com sucesso" });
      } else {
        next(new NotFound("Id do autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async editBook(req, res, next) {
    try {
      const bookFinded = await book.findByIdAndUpdate(req.params.id, req.body);
      if (bookFinded !== null) {
        res.status(200).json({message: "Livro atualizado com sucesso!"});
      } else {
        next(new NotFound("Id do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const bookFinded = await book.findByIdAndDelete(req.params.id);
      if (bookFinded !== null) {
        res.status(200).json({ message: "Livro excluído com sucesso" });
      } else {
        next(new NotFound("Id do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async getBooksByPages(req, res, next) {
    const pages = req.query.pages;
    try {
      const booksByPages = await book.find({ pages });
      res.status(200).json({ message: "Aqui estão seus livros!", books: booksByPages });
    } catch (error) {
      next(error);
    }
  }
}

export default bookController;