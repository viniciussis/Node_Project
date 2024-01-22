import Express from "express";
import connectDatabase from "./config/dbconnect.js";
import book from './models/book.js'

const connection = await connectDatabase();

connection.on('error', (error) => {
  console.error("Connection error: " + error)
})

connection.once('open', () => {
  console.log("Connection sucessfully")
})

const app = Express();
app.use(Express.json())

app.get('/', (req, res) => {
  res.status(200).send('API REST com node.js! :)')
})

app.get('/books', async (req, res) => {
  const bookList = await book.find({})
  res.status(200).json(bookList)
})

app.get('/books/:id', (req, res) => {
  let index = searchBook(req.params.id)
  res.status(200).json(books[index])
})

app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).send('Livro enviado com sucesso')
})

app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).send('Livro cadastrado com sucesso')
})

app.put('/books/:id', (req, res) => {
  let index = searchBook(req.params.id)
  books[index].name = req.body.name
  res.status(200).send('livro atualizado com sucesso')
})

export default app