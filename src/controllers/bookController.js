import NotFound from "../errors/NotFound.js";
import { author } from "../models/index.js";
import { book } from "../models/index.js";

class bookController {

  static async getBooks(req, res, next) {
    try {
      const bookList = book.find();
      req.result = bookList;
      next();
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
        res.status(200).json({ message: "Livro atualizado com sucesso!" });
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

  static async getBooksByFilter(req, res, next) {
    const search = await searchProcess(req.query);

    try {
      const booksByFilter = await book
        .find(search)
        .populate();
      if (booksByFilter.length > 0) {
        res.status(200).json({ message: "Aqui estão seus livros!", books: booksByFilter });
      } else {
        next(new NotFound("Livro não encontrado!"));
      }
    } catch (error) {
      next(error);
    }
  }
}

async function searchProcess(params) {
  const { minPages, maxPages, title, authorName } = params;
  let filter = {};

  if (title) filter.title = { $regex: title, $options: "i" };
  if (minPages || maxPages) filter.pages = {};
  if (minPages) filter.pages.$gte = minPages;
  if (maxPages) filter.pages.$lte = maxPages;
  if (authorName) filter = { ...filter, "author.name": authorName };

  return filter;
}

export default bookController;