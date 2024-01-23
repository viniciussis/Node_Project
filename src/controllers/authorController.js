import {author} from '../models/author.js';

class authorController {

  static async getAuthors(req, res) {
    try {
      const authorList = await author.find({})
      res.status(200).json(authorList)
    } catch (error) {
      res.status(500).json({ message: "Busca não concluída", error: error.message })
    }
  }

  static async searchAuthor(req, res) {
    try {
      const authorFinded = await author.findById(req.params.id)
      res.status(200).json(authorFinded)    
    } catch (error) {
      res.status(500).json({ message: "Não foi possível encontrar o Author", error: error.message })
    }
  }

  static async addAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body)
      res.status(201).json({message: "Author cadastrado com sucesso", author: newAuthor})    
    } catch (error) {
      res.status(500).json({ message: "Não foi possível cadastrar o Author", error: error.message })
    }
  }

  static async editAuthor(req, res) {
    try {
      await author.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({message: "Author atualizado com sucesso!"})    
    } catch (error) {
      res.status(500).json({ message: "Não foi possível atualizar o Author!", error: error.message })
    }
  }

  static async deleteAuthor(req, res) {
    try {
      await author.findByIdAndDelete(req.params.id)
      res.status(200).json({message: "Author excluído com sucesso"})    
    } catch (error) {
      res.status(500).json({ message: "Não foi excluir deletar o Author", error: error.message })
    }
  }
}

export default authorController