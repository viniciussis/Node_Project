import NotFound from "../errors/NotFound.js";
import { author } from "../models/index.js";

class authorController {

  static async getAuthors(req, res, next) {
    try {
      const authorList = await author.find();
      res.status(200).json(authorList);
    } catch (error) {
      next(error);
    }
  }

  static async searchAuthor(req, res, next) {
    try {
      const authorFinded = await author.findById(req.params.id);
      if (authorFinded !== null) {
        res.status(200).json(authorFinded);
      } else {
        next(new NotFound("Id do autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async addAuthor(req, res, next) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: "Author cadastrado com sucesso", author: newAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async editAuthor(req, res, next) {
    try {
      const authorFinded = await author.findByIdAndUpdate(req.params.id, req.body);
      if (authorFinded !== null) {
        res.status(200).json({ message: "Author atualizado com sucesso!" });
      } else {
        next(new NotFound("Id do autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const authorFinded = await author.findByIdAndDelete(req.params.id);
      if (authorFinded !== null) {
        res.status(200).json({ message: "Author excluído com sucesso" });
      } else {
        next(new NotFound("Id do autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default authorController;