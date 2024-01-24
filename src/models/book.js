import { Decimal128 } from "mongodb";
import mongoose from "mongoose";
import { authorSchema } from "./author.js";

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: [true, "O título é obrigatório!"] },
  author: authorSchema,
  pages: { 
    type: Number,
    min: [10, "O número de páginas deve ser entre 10 e 2000. Valor fornecido: {VALUE}"],
    max: [2000, "O número de páginas deve ser entre 10 e 2000. Valor fornecido: {VALUE}"] 
  },
  price: { type: Decimal128 },
  publisher: {
    type: String,
    required: [true, "A editora é obrigatória!"],
    enum: {
      values: ["IFBA", "Alura"],
      message: "{VALUE} não é uma editora permitida!"
    }
  }
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;