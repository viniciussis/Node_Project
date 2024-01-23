import { author } from '../models/author.js';
import book from '../models/book.js';

class bookController {

  static async getBooks(req, res) {
    try {
      const booksList = await book.find({})
      res.status(200).json(booksList)
    } catch (error) {
      res.status(500).json({ message: "Busca não concluída", error: error.message })
    }
  }

  static async searchBook(req, res) {
    try {
      const bookFinded = await book.findById(req.params.id)
      res.status(200).json(bookFinded)
    } catch (error) {
      res.status(500).json({ message: "Não foi possível encontrar o livro", error: error.message })
    }
  }

  static async addBook(req, res) {
    const newBook = req.body
    try {
      const authorFinded = await author.findById(newBook.author)
      const bookCreated = { ...newBook, author: { ...authorFinded._doc } }
      await book.create(bookCreated)
      res.status(201).json({ message: "Livro cadastrado com sucesso" })
    } catch (error) {
      res.status(500).json({ message: "Não foi possível cadastrar o livro", error: error.message })
    }
  }

  static async editBook(req, res) {
    try {
      await book.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({ message: "Livro atualizado com sucesso!" })
    } catch (error) {
      res.status(500).json({ message: "Não foi possível atualizar o livro!", error: error.message })
    }
  }

  static async deleteBook(req, res) {
    try {
      await book.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: "Livro excluído com sucesso" })
    } catch (error) {
      res.status(500).json({ message: "Não foi possível deletar o livro", error: error.message })
    }
  }

  static async getBooksByPages(req, res) {
    const pages = req.query.pages
    try {
      const booksByPages = await book.find({ pages })
      res.status(200).json({ message: "Aqui estão seus livros!", books: booksByPages })
    } catch (error) {
      res.status(500).json({ message: "Não foi possível encontrar livros", error: error.message })
    }
  }
}

export default bookController