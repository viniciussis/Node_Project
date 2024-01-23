import book from './models/book.js';

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
    try {
      const newBook = await book.create(req.body)
      res.status(201).json({message: "Livro cadastrado com sucesso", book: newBook})    
    } catch (error) {
      res.status(500).json({ message: "Não foi possível cadastrar o livro", error: error.message })
    }
  }

  static async editBook(req, res) {
    try {
      await book.findByIdAndDelete(req.params.id, req.body)
      res.status(200).json({message: "Livro atualizado com sucesso!"})    
    } catch (error) {
      res.status(500).json({ message: "Não foi possível atualizar o livro!", error: error.message })
    }
  }

  static async deleteBook(req, res) {
    try {
      await book.create(req.params.id)
      res.status(200).json({message: "Livro excluído com sucesso"})    
    } catch (error) {
      res.status(500).json({ message: "Não foi excluir deletar o livro", error: error.message })
    }
  }
}

export default bookController