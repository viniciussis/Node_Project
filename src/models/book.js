import { Decimal128 } from "mongodb";
import mongoose from "mongoose";
import { authorSchema } from "./author.js"

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: true },
  author: authorSchema,
  pages: { type: Number },
  price: { type: Decimal128 }
}, { versionKey: false })

const book = mongoose.model('books', bookSchema)

export default book