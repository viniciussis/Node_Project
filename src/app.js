import Express from "express";

const app = Express();
app.use(Express.json())

const books = [
  {
    "id": 1,
    "name": "O senhor dos anéis"
  },
  {
    "id": 2,
    "name": "O lar das crianças peculiares"
  }
]

function searchBook(id) {
  return books.findIndex(book => {
    return book.id === Number(id)
  })
}

app.get('/', (req, res) => {
  res.status(200).send('API REST com node.js! :)')
})

app.get('/books', (req, res) => {
  res.status(200).json(books)
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